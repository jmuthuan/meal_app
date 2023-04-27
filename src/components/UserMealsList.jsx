

const UserMealsList = (props) => {


    return (
        <div className='user_meal_list_wrapper'>            
            <h2>User Meals List</h2>

            {props.mealsList && props.favoriteIdList && mealsList.map((meal) => {
                return (                    
                    <MealCard
                        key={meal.idMeal}
                        nameMeal={meal.strMeal}
                        mealImage={meal.strMealThumb}
                        mealId={meal.idMeal}
                        mealCategory={categorieName}
                        isFavorite={true}
                        isLoggedIn={props.isLoggedIn}
                        userId = {props.userId}                       
                    />
                )
            })
            }
            
        </div>
    )

}

export default UserMealsList;