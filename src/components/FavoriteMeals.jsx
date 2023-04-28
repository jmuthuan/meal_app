import { useParams } from "react-router-dom";
//import firebaseStart from "./firebaseStart";
import db from "./firestoreStart";

import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { Component, useEffect, useState } from "react";
import getMealById from "../controllers/getMealById";
import MealCard from "./MealCard";

const FavoriteMeals = (props) => {
    const defaultUserMeal = {
        idMeal: '',
        strMeal: '',
        strInstructions: '',
        strMealThumb: '',
        strIngredient1: '',
        strIngredient2: '',
        strIngredient3: '',
        strIngredient4: '',
        strIngredient5: '',
        strIngredient6: '',
        strIngredient7: '',
        strIngredient8: '',
        strIngredient9: '',
        strIngredient10: '',
        strIngredient11: '',
        strIngredient12: '',
        strIngredient13: '',
        strIngredient14: '',
        strIngredient15: '',
        strIngredient16: '',
        strIngredient17: '',
        strIngredient18: '',
        strIngredient19: '',
        strIngredient20: '',
        strMeasure1: '',
        strMeasure2: '',
        strMeasure3: '',
        strMeasure4: '',
        strMeasure5: '',
        strMeasure6: '',
        strMeasure7: '',
        strMeasure8: '',
        strMeasure9: '',
        strMeasure10: '',
        strMeasure11: '',
        strMeasure12: '',
        strMeasure13: '',
        strMeasure14: '',
        strMeasure15: '',
        strMeasure16: '',
        strMeasure17: '',
        strMeasure18: '',
        strMeasure19: '',
        strMeasure20: ''
    };

    const [favsIds, setFavsIds] = useState([]);
    const [favsMeals, setFavsMeals] = useState([]);
    const [userMeals, setUserMeals] = useState([Object.create(defaultUserMeal)]);

    //traer datos de Firebase:
    //1- desde los id Favoritos: 'favorites/(userId)/idList

    //2- desde myMeals: myMeals/(userId)/userMeals/

    //concatenar la informacion con el mismo formato JSON/Objeto

    const { userId } = useParams();
    const docFavIdRef = doc(db, 'favorites', userId);

    //get data favorite Id and meals
    const getFavoritesId = async () => {
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
    const getFavoriteMealsById = async (id) => {
        const test = await getMealById(id)
        mealsArray.push(test);
    }

    //get data: user meals
    //const docUserMyMeal = doc(db, 'myMeals', userId, 'userMeals');
    const colRef = collection(db, 'myMeals', userId, 'userMeals');

    const getUserMeals = async () => {
        //const docSnap = await getDocs(colRef);

        /* if (docSnap.exists()) {
            console.log("Document data userMeals:", docSnap.data());
            //setFavsIds(docSnap.data().idList);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          } */

        let myMealsArray = [];
        let myMeal = {};

        const querySnapshot = await getDocs(colRef);
        querySnapshot.forEach((doc) => {
            myMeal = Object.create(defaultUserMeal);
            myMeal.idMeal = doc.id;
            myMeal.strMeal = doc.data().strMeal;
            myMeal.strMealThumb = doc.data().strMealThumb;
            myMeal.strInstructions = doc.data().strInstructions.join('\r\n');

            for (let i = 0; i < 20; i++) {                
                if(doc.data().strIngredient[i]){
                    //console.log('if: '+doc.data().strIngredient[i])
                    myMeal[`strIngredient${i + 1}`] = doc.data().strIngredient[i].ingredient;
                    myMeal[`strMeasure${i + 1}`] = doc.data().strIngredient[i].measure;                
                }
                else{
                    //console.log('else: '+doc.data().strInstructions[i])
                    myMeal[`strIngredient${i + 1}`] = '';
                    myMeal[`strMeasure${i + 1}`] = '';
                }        
                     
            }
            //console.log('mymeal', myMeal)   

            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            //console.log(myMeal);
            myMealsArray.push(myMeal);
            //console.log('after...');
            //console.log(myMealsArray);
            
        });
        console.log(myMealsArray);
        setUserMeals(myMealsArray);
    }


    useEffect(() => {
        getFavoritesId();
        if (favsIds.length > 0) {
            mealsArray = favsMeals.concat();
            favsIds.forEach(id => {
                getFavoriteMealsById(id);
            });
            setFavsMeals(mealsArray);

        }

        getUserMeals();
    }, [favsIds.length])

    const onClickTest = () => {
        console.log(userMeals);    
    }


    return (
        <div className="favorite_meal_wrapper">
            <h2>My Favorite Meals</h2>

            <button type="button" onClick={onClickTest}>Test</button>

            {favsMeals && favsMeals.map((meal) => {
                return (
                    <MealCard
                        key={meal.idMeal}
                        nameMeal={meal.strMeal}
                        mealImage={meal.strMealThumb}
                        mealId={meal.idMeal}                        
                        isFavorite={true}
                        isLoggedIn={props.isLoggedIn}
                        userId={userId}
                        fromFavorites={true}
                    />
                )
            })
            }

            {userMeals && userMeals.map((meal) => {
                return (
                    <MealCard
                        key={meal.idMeal}
                        nameMeal={meal.strMeal}
                        mealImage={meal.strMealThumb}
                        mealId={meal.idMeal}                        
                        isFavorite={true}
                        isLoggedIn={props.isLoggedIn}
                        userId={userId}
                        userMeals={meal}
                        fromFavorites={true}
                    />
                )
            })
            }


        </div>
    )

}

export default FavoriteMeals;