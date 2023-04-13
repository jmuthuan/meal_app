import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MealDetail = (props) =>{

    const {id} = useParams();
    const [mealDetail, setMealDetail] = useState();

    useEffect(()=>{
        getMealById(id);
        console.log(mealDetail);
    },[])

    const  getMealById = async (id) =>{
        const API_URL_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';    
        try {
            const response = await axios.get(API_URL_BY_ID+id)
            setMealDetail(response.data.meals)     
            console.log(response.data.meals);       
            
        } catch (error) {
            console.log(error);
            
        }
    }

    return(
        
        <div className="meal_detail_wrapper">
            TO-DO MEAL DETAILS
            
            <h2>{mealDetail.strMeal}</h2>
            <img src={mealDetail.strMealThumb}/>
            <section className="meal_instructions">
                {mealDetail.strInstructions}
            </section>
        </div>
    )

}

export default MealDetail;