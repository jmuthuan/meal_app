import { useState } from "react";
import { FaEdit, FaTrashAlt, FaCheck } from 'react-icons/fa'

const Ingredient = (props) => {

    const [actualIngredient, setActualIngredient] = useState(props.ingredient.ingredient);
    const [actualMeasure, setActualMeasure] = useState(props.ingredient.measure);


    const confirmIngredient = () => {
        console.log('confirm ingredient');
        const inputIngredient = document.getElementById(`mealIngredient${props.actualStepIngredient}`).value;
        const inputMeasure = document.getElementById(`mealMeasure${props.actualStepIngredient}`).value;

        if ((inputIngredient.length > 2 && inputMeasure.length > 0)) {
            props.confirmIngredient({
                ingredient: inputIngredient,
                measure: inputMeasure
            },
                props.actualStepIngredient);           
        } else {
            alert('Ingredient or Measure too short, please verify!');
        }
    }

    const editIngredient = () => {
        console.log('edit ingredient');
        props.editIngredient(props.actualStepIngredient);
    }

    const deleteIngredient = () => {
        console.log('delete ingredient');
        props.deleteIngredient(props.actualStepIngredient);
    }


    const actualIngredientChange = (e) => {
        setActualIngredient(e.target.value);
    }

    const actualMeasureChange = (e) => {
        setActualMeasure(e.target.value);
    }

    return (
        <>
            <tr>
                <td><input
                    type="text"
                    id={`mealIngredient${props.actualStepIngredient}`}
                    className={`inputIngredient ${props.itemState.showInput ? 'showItem' : 'hideItem'}`}
                    placeholder={`Ingredient ${props.actualStepIngredient + 1}`}
                    value={actualIngredient}
                    onChange={actualIngredientChange} />

                    <p
                        className={`text_ingredient ${!props.itemState.showInput ? 'showItem' : 'hideItem'}`}>
                        {props.ingredient.ingredient}</p>
                </td>

                <td><input
                    type="text"
                    id={`mealMeasure${props.actualStepIngredient}`}
                    className={`inputMeasure ${props.itemState.showInput ? 'showItem' : 'hideItem'}`}
                    placeholder={`Measure ingredient ${props.actualStepIngredient + 1}`}
                    value={actualMeasure}
                    onChange={actualMeasureChange}
                />
                    <p
                        className={`text_measure ${!props.itemState.showInput ? 'showItem' : 'hideItem'}`}>
                        {props.ingredient.measure}</p>
                </td>
                <td>
                    <FaCheck
                        className={`icon ${props.itemState.confirm ? 'showItem' : 'hideItem'}`}
                        onClick={confirmIngredient} />
                    <FaEdit
                        className={`icon ${props.itemState.edit ? 'showItem' : 'hideItem'}`}
                        onClick={editIngredient} />
                    <FaTrashAlt
                        className={`icon ${props.itemState.trash ? 'showItem' : 'hideItem'}`}
                        onClick={deleteIngredient} />
                </td>
            </tr>


        </>
    )

}

export default Ingredient;