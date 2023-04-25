import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Instruction from "./Instruction";
import { FaPlusSquare } from 'react-icons/fa'
import './AddMealPage.css';
import Ingredient from "./Ingredient";
import setFirestoreUserMeal from "../controllers/setFirestoreUserMeal";

const AddMealPage = () => {

    const { userId } = useParams();

    const defaultItemState = {
        confirm: true,
        edit: false,
        trash: false,
        showInput: true
    }

    //instructions States
    const [instructions, setInstructions] = useState(['']);
    const [itemsState, setItemsState] = useState([defaultItemState]);
    const [instructionId, setInstructionId] = useState([0]);

    //ingredients State
    const [ingredients, setIngredients] = useState([{
        ingredient: '',
        measure: ''
    }]);
    const [ingredientsId, setIngredientsId] = useState([0]);
    const [iconsState, setIconsState] = useState([defaultItemState]);

    useEffect(() => {
        console.log('rendering add meal');

    }, [])

    const saveMeal = (e) => {
        e.preventDefault();
        console.log("saving meal...");

        let alertMessage = 'Please check the following input data: \n';
        let alertFlag = false;

        const idMeal = Date.now(); //
        const strMeal = document.getElementById('mealName').value;
        
        if(strMeal === ''){
            alertMessage+='Name meal \n';
            alertFlag = true;
        }

        const strInstructions = instructions.concat();        
        for(let i=0; i< strInstructions.length; i++){
            if(strInstructions[i]===''){
                strInstructions.splice(i,1);
            }
        }
        if(strInstructions.length ===0){
            alertMessage+='Fill Instructions data \n';
            alertFlag=true;
        }

        const strIngredient = ingredients.concat();
        for(let i=0; i<strIngredient.length; i++){
            if(strIngredient[i].ingredient ===''){
                strIngredient.splice(i,1);
            }
        }
        if(strIngredient.length===0){
            alertMessage+='Fill ingredients data \n';
            alertFlag=true; 
        }

        const strMealThumb = document.getElementById('strMealThumb').files[0];
      
        const docData = {            
            strMeal: strMeal,
            strInstructions: strInstructions,
            strMealThumb: strMealThumb,
            strIngredient: strIngredient
        }

        if(alertFlag){
            alert(alertMessage);
        }
        else{
            console.log(docData);            
            setFirestoreUserMeal(docData, 'myMeals', userId, idMeal);        
        }
    }

    //instructions controllers
    const addInstruction = () => {
        let updateInstructions = instructions.map(element => element);
        updateInstructions.push('');

        let updateItemState = itemsState;
        updateItemState.push({
            confirm: true,
            edit: false,
            trash: true,
            showInput: true
        });

        let updateIds = instructionId.concat();
        updateIds.push(updateIds[updateIds.length - 1] + 1);


        console.log(updateInstructions);
        setInstructions(updateInstructions);
        setItemsState(updateItemState);
        setInstructionId(updateIds);
    }

    const deleteInstruction = (stepNumber) => {
        console.log('delete instruction');

        let updateInstructions = instructions.map(element => element);
        let updateIds = instructionId;
        let updateItemState = itemsState;

        if (instructions.length > 1) {
            updateInstructions.splice(stepNumber, 1)
            updateItemState.splice(stepNumber, 1);
            updateIds.splice(stepNumber, 1);


            /* for (let i = 0; i < updateInstructions.length; i++) {
                if (updateInstructions[i] === '') {
                    updateInstructions.splice(i, 1)
                    updateItemState.splice(i, 1);
                    updateIds.splice(i, 1);
                    i--;
                }
            } */

            console.log('after...');
            console.log(updateInstructions);

            setInstructions(updateInstructions);
            setItemsState(updateItemState);
            setInstructionId(updateIds);

        } else {
            setInstructions(['']);
            setItemsState([defaultItemState]);
            setInstructionId([updateIds[updateIds.length - 1] + 1]);
        }

    }

    const confirmInstruction = (newInstruction, position) => {
        console.log('confirm instruction');
        //console.log(instructions);

        let updateInstructions = instructions.map(element => element);
        let updateItemState = itemsState;
        let updateIds = instructionId;

        updateInstructions.splice(position, 1, newInstruction);

        if ((position + 1) === updateInstructions.length) {

            updateInstructions.push('');
            updateItemState.push({
                confirm: true,
                edit: false,
                trash: true,
                showInput: true
            });
            updateIds.push(updateIds[updateIds.length - 1] + 1);

            setInstructionId(updateIds);
        }

        updateItemState[position] = {
            confirm: false,
            edit: true,
            trash: true,
            showInput: false
        }

        //console.log(updateItemState);
        setInstructions(updateInstructions);
        setItemsState(updateItemState);
    }

    const editInstruction = (position) => {
        console.log('edit instruction');

        let updateItemState = itemsState.concat();

        updateItemState[position] = {
            confirm: true,
            edit: false,
            trash: true,
            showInput: true
        }
        //console.log(updateItemState);
        setItemsState(updateItemState);
    }


    //ingredients controllers
    const addIngredient = () => {
        let updateIngredient = ingredients.concat();
        updateIngredient.push({
            ingredient: '',
            measure: ''
        });

        let updateIconState = iconsState.concat();
        updateIconState.push({
            confirm: true,
            edit: false,
            trash: true,
            showInput: true
        });

        let updateIngredientId = ingredientsId.concat();
        updateIngredientId.push(updateIngredientId[updateIngredientId.length - 1] + 1);

        setIngredients(updateIngredient);
        setIngredientsId(updateIngredientId);
        setIconsState(updateIconState);

        console.log('add ingredient');
    }

    const confirmIngredient = (newIngredient, position) => {
        let updateIngredient = ingredients.concat();
        let updateIconState = iconsState.concat();
        let updateIds = ingredientsId.concat();

        updateIngredient.splice(position, 1, newIngredient)

        if ((position + 1) === updateIngredient.length) {

            updateIngredient.push({
                ingredient: '',
                measure: ''
            });
            updateIconState.push({
                confirm: true,
                edit: false,
                trash: true,
                showInput: true
            });

            updateIds.push(updateIds[updateIds.length - 1] + 1);

            setIngredientsId(updateIds);
        }

        updateIconState[position] = {
            confirm: false,
            edit: true,
            trash: true,
            showInput: false
        }

        setIngredients(updateIngredient);
        setIconsState(updateIconState);
    }

    const editIngredient = (position) => {
        let updateIconState = iconsState.concat();

        updateIconState[position] = {
            confirm: true,
            edit: false,
            trash: true,
            showInput: true
        }
        setIconsState(updateIconState);
    }

    const deleteIngredient = (stepNumber) => {
        let updateIngredient = ingredients.concat();
        let updateIds = ingredientsId.concat();
        let updateIconState = iconsState.concat();

        if (ingredients.length > 1) {
            updateIngredient.splice(stepNumber, 1)
            updateIconState.splice(stepNumber, 1);
            updateIds.splice(stepNumber, 1);

            setIngredients(updateIngredient);
            setIconsState(updateIconState);
            setIngredientsId(updateIds);
        } else {
            setIngredients([{
                ingredient: '',
                measure: ''
            }]);
            setIconsState([defaultItemState])
            setIngredientsId([updateIds[updateIds.length - 1] + 1])
        }
    }

    return (
        <div className="add_meal_wrapper">
            <h2>Add your personal meal</h2>
            <form className="add_meal_form">
                <label htmlFor="mealName">Meal Name</label><br />
                <input type="text" id="mealName" required /><br />
                <label htmlFor={`mealInstructions${instructions.length}`}>Set Instructions</label><br />

                <section className="meal_instructions_wrapper">
                    <table>
                        <tbody>
                            {instructions.map((instruction, index) => {
                                return (
                                    <Instruction
                                        key={instructionId[index]}
                                        actualStepInstruction={index}
                                        instructions={instruction}
                                        itemState={itemsState[index]}
                                        confirmInstruction={confirmInstruction}
                                        editInstruction={editInstruction}
                                        deleteInstruction={deleteInstruction}
                                    />
                                )
                            })}
                        </tbody>
                    </table>

                    <FaPlusSquare
                        onClick={addInstruction}
                    />

                </section>

                <label htmlFor={`mealIngredients${instructions.length}`}>Ingredients</label><br />
                <section className="meal_ingredients_wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Ingredient</th>
                                <th>Measure/Quantity</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ingredients.map((ingredient, index) => {
                                    return (
                                        <Ingredient
                                            key={ingredientsId[index]}
                                            ingredient={ingredient}
                                            actualStepIngredient={index}
                                            itemState={iconsState[index]}
                                            confirmIngredient={confirmIngredient}
                                            editIngredient={editIngredient}
                                            deleteIngredient={deleteIngredient}
                                        />
                                    )
                                })

                            }
                        </tbody>
                    </table>

                    <FaPlusSquare
                        onClick={addIngredient}
                    />
                </section>

                <input type="file" id="strMealThumb" />
                <button type="submit" onClick={saveMeal}>Save</button>
            </form>
        </div>
    )
}

export default AddMealPage;