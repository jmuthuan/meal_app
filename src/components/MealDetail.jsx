import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import getMealById from "../controllers/getMealById";
import axios from "axios";
import './MealDetail.css';
import defaultImgIngredient from '../img/No_Image_Available.jpg'

const MealDetail = (props) => {

    const { id } = useParams();
    let { state } = useLocation();


    const [mealDetail, setMealDetail] = useState() //(state.userMeal);
    const [imgIngredients, setImgIngredients] = useState([]);
    const [ingredientListState, setIngredientListState] = useState([]);
    const [measureListState, setMeasureListState] = useState([]);

    const getMeal = async (id) => {
        setMealDetail(await getMealById(id))
    }

    const getIngredientImage = async (ingredientArray) => {
        let imgResults = [];
        for (let i = 0; i < ingredientArray.length; i++) {
            try {
                const srcImg = await axios.get(`https://www.themealdb.com/images/ingredients/${ingredientArray[i]}-Small.png`);
                imgResults.push(`https://www.themealdb.com/images/ingredients/${ingredientArray[i]}-Small.png`);

            } catch (error) {
                console.log('an error has ocured, ingredient :' + ingredientArray[i] + ' not found')
                imgResults.push(defaultImgIngredient);
            }
        }

        setImgIngredients(imgResults);
    }

    let ingredientList = [];
    let measureList = [];

    useEffect(() => {

        if (!id.includes('user')) {
            if (!state.fullMealData) {
                getMeal(id);
            } else {
                setMealDetail(state.userMeal);
            }

        } else {
            setMealDetail(state.userMeal);
        }


        if (mealDetail) {
            ingredientList = [];

            for (let i = 1; i <= 20; i++) {
                if (mealDetail['strIngredient' + i]) {
                    ingredientList.push(mealDetail['strIngredient' + i]);
                }
                if (mealDetail['strMeasure' + i]) {
                    measureList.push(mealDetail['strMeasure' + i]);
                }
            }

            getIngredientImage(ingredientList);
            setMeasureListState(measureList);
            setIngredientListState(ingredientList);
            props.setMealName(mealDetail.strMeal);
        }

    }, [mealDetail?.strMeal]);


    return (
        <main>
            <div className="main_wrapper">

                {mealDetail && <><h2>{mealDetail.strMeal}</h2>
                    <div className="meal_detail_wrapper">
                        {/* <img className="meal_detail_img" src={mealDetail.strMealThumb} /> */}
                        <section className="meal_instructions">
                            <div className="meal_img_wrapper">
                                <img className="meal_detail_img" src={mealDetail.strMealThumb} />
                            </div>
                            <ol>
                                {mealDetail.strInstructions?.split('\r\n').map((paragraph) => {
                                    return (
                                        <li key={Math.random()}>{paragraph}</li>
                                    )
                                })}
                            </ol>
                        </section>

                        <h3>Ingredients</h3>

                        <section className="meal_ingredients">

                            {
                                ingredientList &&
                                ingredientListState.map((ingredient, index) => {

                                    return (
                                        <div className="ingredient_card" key={ingredient + Math.random()}>
                                            <img
                                                src={props.isUser ? `${imgIngredients[index]}` : `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`}
                                                alt={`of ${ingredient}`} />
                                            <div className="ingredient_name">{ingredient}</div>
                                            <div className="ingredient_measure">({measureListState[index]})</div>
                                        </div>
                                    )
                                })
                            }
                        </section>
                    </div>
                </>}
            </div>
        </main>
    )
}

export default MealDetail;