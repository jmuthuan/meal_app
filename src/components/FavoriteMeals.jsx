import { useParams } from "react-router-dom";
//import firebaseStart from "./firebaseStart";
import db from "./firestoreStart";

import {doc, getDoc} from 'firebase/firestore'
import { useEffect, useState } from "react";
import getMealById from "../controllers/getMealById";
import MealCard from "./MealCard";

const FavoriteMeals = (props) =>{

    const [favsIds, setFavsIds] = useState([]);
    const [favsMeals, setFavsMeals] = useState([]);
    //traer datos de Firebase:
    //1- desde los id Favoritos: 'favorites/(userId)/idList

    //2- desde myMeals: myMeals/(userId)/userMeals/

    //concatenar la informacion con el mismo formato JSON/Objeto

    const {userId} = useParams();   
    const docFavIdRef = doc(db, 'favorites', userId);

    const docUserMyMeal = doc(db, 'myMeals', userId);

    //get data favorite Id and meals
    const getFavoritesId = async () =>{
        const docSnap = await getDoc(docFavIdRef);

        if (docSnap.exists()) {
            //console.log("Document data:", docSnap.data());
            setFavsIds(docSnap.data().idList);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
    }

    let mealsArray = [];
    const getFavoriteMealsById = async (id) =>{        
        const test = await getMealById(id)
        mealsArray.push(test);
    }

    //get data: user meals
    const getUserMeals = async () =>{
        const docSnap = await getDoc(docUserMyMeal);

        if (docSnap.exists()) {
            console.log("Document data userMeals:", docSnap.data());
            //setFavsIds(docSnap.data().idList);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }

    }


    useEffect(()=>{
        getFavoritesId();  
        if(favsIds.length > 0){
            mealsArray = favsMeals.concat();
            favsIds.forEach(id => {
                getFavoriteMealsById(id);
            });
            setFavsMeals(mealsArray);
               
        }

        getUserMeals();
    },[favsIds.length])

    const onClickTest = () =>{
        console.log(favsMeals);        
    }
    

    return(
        <div className="favorite_meal_wrapper">
            <h2>My Favorite Meals</h2>

            {console.log(favsIds)}

            <button type="button" onClick={onClickTest}>Test</button>


            {favsMeals && favsMeals.map((meal) => {
                return (                    
                    <MealCard
                        key={meal.idMeal}
                        nameMeal={meal.strMeal}
                        mealImage={meal.strMealThumb}
                        mealId={meal.idMeal}
                        //mealCategory={categorieName}
                        isFavorite={true}
                        isLoggedIn={props.isLoggedIn}
                        userId = {userId}                       
                    />
                )
            })
            }


        </div>
    )

}

export default FavoriteMeals;