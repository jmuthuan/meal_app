import { useEffect, useState } from "react";
import MealCategoryCard from "./MealCategoryCard";
import './MealCategories.css';
import getAllCategories from "../controllers/getAllCategories";


const MealCategories = (props) => {

    const [categories, setCategories] = useState([]);
    
    const getCategories = async () => {        
        setCategories(await getAllCategories());
    }

    useEffect(() => {
        getCategories();            
    }, []);
   
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