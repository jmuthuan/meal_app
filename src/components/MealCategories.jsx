import { useEffect, useState } from "react";
import axios from "axios";
import MealCategoryCard from "./MealCategoryCard";
import './MealCategories.css';


const MealCategories = (props) => {

    const [categories, setCategories] = useState([]);

    const CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/categories.php';

    const getCategories = async () => {
        const res = await axios.get(CATEGORIES_URL);
        setCategories(res.data.categories);
    }

    useEffect(() => {
        getCategories();        
    }, [categories.length]);
   
    return (
        <main>
            <div>
                Meal categories             
                <div className="meal_categories_wrapper">
                    {
                        categories.map((element, index) => {
                            return (
                                <MealCategoryCard
                                    key={element.idCategory}
                                    name={element.strCategory}
                                    image={element.strCategoryThumb}
                                    enabled={!props.isLoggedIn && index > 0?false : true}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </main>
    )
}


export default MealCategories;