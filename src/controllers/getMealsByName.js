import axios from "axios";

const getMealsByName = async (name) =>{
    const BY_NAME_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    
    const res = await axios.get(BY_NAME_URL+name); 
    return res.data.meals;
}

export default getMealsByName;