import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MealCard from './MealCard';
import getAllMealsByCategory from '../controllers/getAllMealsByCategory';


const MealList = (props) => {
    const { categorieName } = useParams();
    //const userId = currentUser();

    const [mealsList, setMealsList] = useState([]);   

    const getAllMeals = async (category) => {
        setMealsList(await getAllMealsByCategory(category))
    }    


    useEffect(() => {
        getAllMeals(categorieName);       
    }, [])

    console.log(props.favoriteIdList);
    

    return (
        <div className='meal_list_wrapper'>            
            <h2>{categorieName} Meals List</h2>

            {mealsList && props.favoriteIdList && mealsList.map((meal) => {
                return (                    
                    <MealCard
                        key={meal.idMeal}
                        nameMeal={meal.strMeal}
                        mealImage={meal.strMealThumb}
                        mealId={meal.idMeal}
                        mealCategory={categorieName}
                        isFavorite={props.favoriteIdList.includes(meal.idMeal)? true :false}
                        isLoggedIn={props.isLoggedIn}
                        userId = {props.userId}                       
                    />
                )
            })
            }
            
        </div>
    )
}

export default MealList;