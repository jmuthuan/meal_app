import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getMealById from "../controllers/getMealById";
import './MealDetail.css';

const MealDetail = (props) => {

    const { id } = useParams();
    const [mealDetail, setMealDetail] = useState();

    const getMeal = async (id) => {
        setMealDetail(await getMealById(id))
    }

    useEffect(() => {
        getMeal(id)
    }, [])

    let ingredientList = [];
    let measureList = [];
    if (mealDetail) {
        for (let i = 1; i <= 20; i++) {
            if(mealDetail['strIngredient'+i]!==""){
                ingredientList.push(mealDetail['strIngredient'+i])
            }     
            if(mealDetail['strMeasure'+i]){
                measureList.push(mealDetail['strMeasure'+i])
            }       
        }
        /* console.log(ingredientList);
        console.log(measureList); */
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
                                <li key={id + paragraph}>{paragraph}</li>
                            )
                        })}
                    </ol>
                </section>

                <h3>Ingredients</h3>
                <section className="meal_ingredients">
                    {
                        ingredientList && ingredientList.map((ingredient, index)=>{
                            return(
                                <div className="ingredient_card" key={ingredient}>
                                    <img 
                                    src={`https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`} 
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