import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MealCard from './MealCard';
import axios from "axios";

const MealList = (props) => {
    const { categorieName } = useParams();

    const [mealsList, setMealsList] = useState([]);

    useEffect(() => {
        getAllMealsBycategory(categorieName);
    }, [])

    const getAllMealsBycategory = async (category) => {
        const API_URL_MEALS_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
      
        try {
            const response = await axios.get(API_URL_MEALS_BY_CATEGORY + category);
            setMealsList(response.data.meals);
            console.log('axios...');
           

        } catch (error) {
            console.log(error);
            return error;
        }
    }
    

    return (
        <div className='meal_list_wrapper'>
           
            {mealsList && mealsList.map((meal) => {
                return (
                    <MealCard
                        key={meal.idMeal}
                        nameMeal={meal.strMeal}
                        mealImage={meal.strMealThumb}
                        mealId={meal.idMeal}
                        mealCategory = {categorieName}
                    />
                )
            })
            }
        </div>
    )

}

export default MealList;