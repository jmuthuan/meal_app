import axios from 'axios';

const getMealCategories = async () =>{
    const CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/categories.php';

    /* const getCategories = async () =>{ */
        const res = await axios.get(CATEGORIES_URL);        
        return res.data.categories;
    //}
/* 
    return getCategories(); */
}

export default getMealCategories;
