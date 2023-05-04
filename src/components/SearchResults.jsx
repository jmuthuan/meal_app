import { useEffect, useState } from "react";
import getMealsByName from "../controllers/getMealsByName";
import getMealsByIngredient from "./getMealsByIngredient";
import MealCard from "./MealCard";


const SearchResults = (props) => {

    const [nameMealResult, setNameMealResult] = useState([]);
    const [fullMealData, setFullMealData] = useState(false);

    const getMeals = async () => {
        let meals;
        console.log('searchByValue', props.searchByValue)
        console.log('bar value', props.searchBarValue);
        if (props.searchByValue === 'name') {
            meals = await getMealsByName(props.searchBarValue);
            setFullMealData(true);
        }
        else {
            meals = await getMealsByIngredient(props.searchBarValue);
            setFullMealData(false);
        }
        setNameMealResult(meals);

        console.log('meals', meals);
    }

    useEffect(() => {
        getMeals();
    }, [props.searchBarValue])


    return (
        //TO-DO map from array with results add <MealCard />
        <div className="search_results_wrapper">TO-DO
            {
                nameMealResult && nameMealResult.map(meal => {
                    return (
                        <MealCard
                            key={meal.idMeal}
                            nameMeal={meal.strMeal}
                            mealImage={meal.strMealThumb}
                            mealId={meal.idMeal}
                            isFavorite={props.favoriteIdList?.includes(meal.idMeal) ? true : false}
                            isLoggedIn={props.isLoggedIn}
                            userId={props.userId}
                            userMeals={meal}
                            fromSearch={true}
                            fullMealData={fullMealData}
                        />
                    )
                })
            }

        </div>

    )
}

export default SearchResults;