import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Instruction from "./Instruction";
import { FaPlusSquare, FaUpload } from 'react-icons/fa';
import './AddMealPage.css';
import Ingredient from "./Ingredient";
import setFirestoreUserMeal from "../controllers/setFirestoreUserMeal";
import customSweetAlert from "../controllers/sweetAlert";

const AddMealPage = () => {

    const { userId } = useParams();
    const navigate = useNavigate();

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

    //photo state
    const [mealPhotoName, setMealPhotoName] = useState('');

    useEffect(() => {
    }, [])

    const saveMeal = (e) => {
        e.preventDefault();
  
        let alertMessage = '';
        let alertFlag = false;

        const idMeal = Date.now(); //
        const strMeal = document.getElementById('add_mealName').value;       

        if (strMeal === '') {
            alertMessage += 'Name meal \n';
            alertFlag = true;
        }

        const strInstructions = instructions.concat();
        for (let i = 0; i < strInstructions.length; i++) {
            if (strInstructions[i] === '') {
                strInstructions.splice(i, 1);
            }
        }
        if (strInstructions.length === 0) {
            alertMessage += 'Fill Instructions data \n';
            alertFlag = true;
        }

        const strIngredient = ingredients.concat();
        for (let i = 0; i < strIngredient.length; i++) {
            if (strIngredient[i].ingredient === '') {
                strIngredient.splice(i, 1);
            }
        }
        if (strIngredient.length === 0) {
            alertMessage += 'Fill ingredients data';
            alertFlag = true;
        }

        const strMealThumb = document.getElementById('strMealThumb').files[0];

        const docData = {
            strMeal: strMeal,
            strInstructions: strInstructions,
            strMealThumb: strMealThumb,
            strIngredient: strIngredient
        }

        if (alertFlag) {
            const arrayMessage = alertMessage.split('\n');           
            customSweetAlert('Please check the following input data:',arrayMessage, 'error');           
        }
        else {
            setFirestoreUserMeal(docData, 'myMeals', userId, idMeal);       
            navigate('/'); 
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

        setInstructions(updateInstructions);
        setItemsState(updateItemState);
        setInstructionId(updateIds);
    }

    const deleteInstruction = (stepNumber) => {

        let updateInstructions = instructions.map(element => element);
        let updateIds = instructionId;
        let updateItemState = itemsState;

        if (instructions.length > 1) {
            updateInstructions.splice(stepNumber, 1)
            updateItemState.splice(stepNumber, 1);
            updateIds.splice(stepNumber, 1);

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

        setInstructions(updateInstructions);
        setItemsState(updateItemState);
    }

    const editInstruction = (position) => {

        let updateItemState = itemsState.concat();

        updateItemState[position] = {
            confirm: true,
            edit: false,
            trash: true,
            showInput: true
        }
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


    /* ************************************ */
    const fileUploadClick = () => {
        setMealPhotoName('');
    }

    const fileUpload = (e) => {
        const strMealThumb = document.getElementById('strMealThumb').files[0];
        if (strMealThumb?.name) {
            setMealPhotoName(strMealThumb.name);
        }
    }

    return (
        <main>
            <div className="main_wrapper">
                <h2>Add your personal meal</h2>

                <div className="add_meal_wrapper">
                    <form className="add_meal_form">
                        <label htmlFor="add_mealName">Meal Name</label>
                        <input type="text" id="add_mealName" required /> <br />
                        {/* <label htmlFor={`mealInstructions${instructions.length}`}>Set Instructions</label><br /> */}

                        <section className="meal_instructions_wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Set Instructions</th>
                                    </tr>
                                </thead>
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
                                className="plus_meal_instruction"
                                onClick={addInstruction}
                            />

                        </section>

                        {/* <label htmlFor={`mealIngredients${instructions.length}`}>Ingredients</label><br /> */}
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
                                className="plus_meal_ingredient"
                                onClick={addIngredient}
                            />
                        </section>
                        <label htmlFor="strMealThumb">Meal Photo (option) </label>
                        <label htmlFor="strMealThumb" className="custom_label_upload">
                            <span className="custom_file_upload">
                                <FaUpload />Choose a file...
                            </span>
                            <span className="custom_photo_name">  {mealPhotoName}</span>
                        </label>
                        <input
                            type="file"
                            id="strMealThumb"
                            className="str_meal_photo"
                            onClick={fileUploadClick}
                            onChange={fileUpload}
                        />

                        <button type="submit" className="save_button" onClick={saveMeal}>Save</button>
                    </form>
                </div>

            </div>
        </main>
    )
}

export default AddMealPage;