import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import getMealById from "../controllers/getMealById";
import axios from "axios";
import './MealDetail.css';
import defaultImgIngredient from '../img/No_Image_Available.jpg'

const MealDetail = (props) => {

    const { id } = useParams();
    let { state } = useLocation();

    const [mealDetail, setMealDetail] = useState(state.userMeal);
    const [imgIngredients, setImgIngredients] = useState([]);

    const getMeal = async (id) => {
        setMealDetail(await getMealById(id))
    }
  
    const getIngredientImage = async (ingredient, array) => {

        try {
            const srcImg = await axios.get(`https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`);
            array.push(`https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`);

        } catch (error) {
            console.log('an error has ocured, ingredient :' + ingredient + ' not found')
            array.push(defaultImgIngredient);        
        }
        setImgIngredients(array);
    }

    let ingredientList = [];
    let measureList = [];

    useEffect(() => {
        if (!id.includes('user')) {
            getMeal(id)            
        }

        if (mealDetail) {
            let imgSrc = [];
            for (let i = 1; i <= 20; i++) {
                if (mealDetail['strIngredient' + i] !== "") {
                    getIngredientImage(mealDetail['strIngredient' + i], imgSrc);         
                }
            }            
        }

    }, [mealDetail?.strMeal])
    
        if (mealDetail) {          
            for (let i = 1; i <= 20; i++) {
                if (mealDetail['strIngredient' + i] !== "") {
                    ingredientList.push(mealDetail['strIngredient' + i])   
                }
                if (mealDetail['strMeasure' + i]) {
                    measureList.push(mealDetail['strMeasure' + i])
                }
            }
            props.setMealName(mealDetail.strMeal);
        }
    

    return (
        <div className="meal_detail_wrapper">

            {mealDetail && <>
                <h2>{mealDetail.strMeal}</h2>
                <img className="meal_detail_img" src={mealDetail.strMealThumb} />
                <section className="meal_instructions">
                    <ol>
                        {mealDetail.strInstructions.split('\r\n').map((paragraph) => {
                            return (
                                <li key={Math.random()}>{paragraph}</li>
                            )
                        })}
                    </ol>
                </section>

                <h3>Ingredients</h3>
                {/* {props.isUser? console.log(imgIngredients):'image from mealDB'} */}
                <section className="meal_ingredients">
                    {
                        ingredientList && ingredientList.map((ingredient, index) => {
                            
                            return (
                                <div className="ingredient_card" key={ingredient+Math.random()}>
                                    <img                                        
                                        src={props.isUser?`${imgIngredients[index]}`:`https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`}
                                        alt={`of ${ingredient}`} />
                                    <div className="ingredient_name">{ingredient}</div>
                                    <div className="ingredient_measure">({measureList[index]})</div>
                                </div>
                            )
                        })
                    }
                </section>
            </>}
        </div>
    )
}

export default MealDetail;