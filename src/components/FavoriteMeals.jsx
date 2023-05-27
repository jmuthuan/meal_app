import { useParams } from "react-router-dom";
import db from '../controllers/firestoreStart';

import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { useState } from "react";
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
    const [favsMeals, setFavsMeals] = useState(null);
    const [userMeals, setUserMeals] = useState([Object.create(defaultUserMeal)]);

    const { userId } = useParams();
    const docFavIdRef = doc(db, 'favorites', userId);

    //get data favorite Id and meals
    const getFavoritesId = async () => {       
        const docSnap = await getDoc(docFavIdRef);

        if (docSnap.exists()) {
            //console.log("Document data:", docSnap.data());
            //setFavsIds(docSnap.data().idList);            

            return docSnap.data().idList;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    //get data: user meals    
    const colRef = collection(db, 'myMeals', userId, 'userMeals');
    const getUserMeals = async () => {       
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
                if (doc.data().strIngredient[i]) {
                    myMeal[`strIngredient${i + 1}`] = doc.data().strIngredient[i].ingredient;
                    myMeal[`strMeasure${i + 1}`] = doc.data().strIngredient[i].measure;
                }
                else {
                    myMeal[`strIngredient${i + 1}`] = '';
                    myMeal[`strMeasure${i + 1}`] = '';
                }
            }
            myMealsArray.push(myMeal);
        });
        //setUserMeals(myMealsArray);
        return myMealsArray;
    }

    const getGlobalMealTest = async () => {

        const idList = await getFavoritesId();

        //get favorite meals  
        let mealsArray = [];
        for (let i = 0; i < idList.length; i++) {
            const mealFavs = await getMealById(idList[i]);
            mealsArray = mealsArray.concat(mealFavs);
        }
  
        const mealUser = await getUserMeals();
       
        setFavsIds(idList);
        setFavsMeals(mealsArray);
        setUserMeals(mealUser);
    }
   
    if (!favsMeals) {
        getGlobalMealTest();
    }

    return (
        <main>
            <div className="main_wrapper">
                <h2>My Favorite Meals</h2>
                <div className="favorite_meal_wrapper">

                    {favsMeals && (userMeals.length === 0) &&
                        <p className="empty_favorites">You don't have favorite or presonal meals</p>}

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
                        //console.log(favsMeals);
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
            </div>
        </main>
    )

}

export default FavoriteMeals;