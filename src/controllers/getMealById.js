import axios from "axios";

const  getMealById = async (id) =>{
    const API_URL_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  
    try {
        const response = await axios.get(API_URL_BY_ID+id)   
        return response.data.meals[0];
        
    } catch (error) {
        console.log(error);
        return error;
    }
}

export default getMealById;