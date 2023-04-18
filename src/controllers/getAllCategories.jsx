import axios from "axios";

const getAllCategories = async ()=>{

    const CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/categories.php';

    try {
        const response = await axios.get(CATEGORIES_URL);        
        return response.data.categories;               

    } catch (error) {
        console.log(error);
        return error;
    } 
}

export default getAllCategories;