import { useEffect, useState } from "react";
import getMealsByName from "../controllers/getMealsByName";
import getMealsByIngredient from "../controllers/getMealsByIngredient";
import MealCard from "./MealCard";


const SearchResults = (props) => {

    const [nameMealResult, setNameMealResult] = useState([]);
    const [fullMealData, setFullMealData] = useState(false);

    let searchBarValue = props.searchBarValue;
    let searchByValue = props.searchByValue;

    if(searchBarValue){
        sessionStorage.setItem('searchBarValue', props.searchBarValue);
        sessionStorage.setItem('searchByValue', props.searchByValue);
    }
    else{
        searchBarValue = sessionStorage.getItem('searchBarValue');
        searchByValue = sessionStorage.getItem('searchByValue');
    }

    const getMeals = async () => {
        let meals;
       
        if (searchByValue === 'name') {
            meals = await getMealsByName(searchBarValue.replaceAll(' ','_'));
            setFullMealData(true);
        }
        else {
            meals = await getMealsByIngredient(searchBarValue.replaceAll(' ','_'));
            setFullMealData(false);
        }
        setNameMealResult(meals);
      
    }

    useEffect(() => {
        getMeals();
    }, [props.searchBarValue])


    return (
        <main>
            <div className="main_wrapper">
                <h2>Search Results 
                    <span className="search_description">{` (for ${searchBarValue.toUpperCase()}, search by ${searchByValue.toUpperCase()})`}
                    </span>
                    </h2>
                <div className="search_results_wrapper">
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

            </div>
        </main>
    )
}

export default SearchResults;