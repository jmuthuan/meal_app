import axios from "axios";

const getMealsByIngredient = async (ingredient) => {
    const BY_INGREDIENT_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

    const res = await axios.get(BY_INGREDIENT_URL+ingredient) ;
    return res.data.meals;
}

export default getMealsByIngredient;