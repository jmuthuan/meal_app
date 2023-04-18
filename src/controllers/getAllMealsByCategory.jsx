import axios from "axios";

const getAllMealsBycategory = async (category) => {
    const API_URL_MEALS_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
    
    try {
        const response = await axios.get(API_URL_MEALS_BY_CATEGORY + category);
        return response.data.meals;

    } catch (error) {
        console.log(error);
        return error;
    }   
   
}

export default getAllMealsBycategory;