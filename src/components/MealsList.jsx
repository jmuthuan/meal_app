import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MealCard from './MealCard';
import getAllMealsByCategory from '../controllers/getAllMealsByCategory';


const MealList = (props) => {
    const { categorieName } = useParams();
    //const userId = currentUser();

    const navigate = useNavigate();

    const [mealsList, setMealsList] = useState([]);


    useEffect(() => {  
        getAllMeals(categorieName); 
    }, [])

    const getAllMeals = async (category) => {
        setMealsList(await getAllMealsByCategory(category))
    }

    return (
        <main>
            <div className="main_wrapper">
                <h2>{categorieName} Meals List</h2>
                <div className='meal_list_wrapper'>
                    {mealsList && mealsList.map((meal) => {
                        return (
                            <MealCard
                                key={meal.idMeal}
                                nameMeal={meal.strMeal}
                                mealImage={meal.strMealThumb}
                                mealId={meal.idMeal}
                                mealCategory={categorieName}
                                isFavorite={props.favoriteIdList?.includes(meal.idMeal) ? true : false}
                                isLoggedIn={props.isLoggedIn}
                                userId={props.userId}
                            />
                        )
                    })
                    }
                </div>
            </div>
        </main>
    )
}

export default MealList;