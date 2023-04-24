import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Instruction from "./Instruction";
import { FaPlusSquare } from 'react-icons/fa'
import './AddMealPage.css';
import Ingredient from "./Ingredient";

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
    const [ingredients, setIngredients] = useState(['']);
    const [ingredientsId, setIngredientsId] = useState([0]);


    useEffect(() => {
        console.log('rendering add meal');

    }, [])

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

        let updateIds = instructionId;
        updateIds.push(updateIds[updateIds.length - 1] + 1);


        console.log(updateInstructions);
        setInstructions(updateInstructions);
        setItemsState(updateItemState);
        setInstructionId(updateIds);

    }

    const deleteInstruction = (stepNumber) => {
        console.log('delete instruction');
        console.log('position: ' + stepNumber);
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
            //setStepInstruction(updateInstructions.length - 1);
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


    return (
        <div className="add_meal_wrapper">
            <h2>Add your personal meal</h2>
            <form className="add_meal_form">
                <label htmlFor="mealName">Meal Name</label><br />
                <input type="text" id="mealName" /><br />
                <label htmlFor={`mealInstructions${instructions.length}`}>Instructions</label><br />

                <section className="meal_instructions_wrapper">

                    {instructions.map((instruction, index) => {
                        return (
                            <Instruction
                                key={instructionId[index]}
                                actualStepInstruction={index}
                                instructions={instruction}
                                itemState={itemsState[index]}                                
                                setInstructions={setInstructions}
                                confirmInstruction={confirmInstruction}
                                editInstruction = {editInstruction}                                
                                deleteInstruction={deleteInstruction}
                            />
                        )
                    })}

                    <FaPlusSquare
                        onClick={addInstruction}
                    />

                    <label htmlFor={`mealIngredients${instructions.length}`}>Ingredients</label><br />
                    <section className="meal_ingredients_wrapper">
                        {
                            ingredients.map((ingredient, index)=>{
                                return(
                                    <Ingredient 
                                    
                                    />
                                )
                            })

                        }


                    </section>

                </section>



                {
/* 
idMeal
strMeal
strInstructions
strMealThumb
strIngredient[]
strMeasure[]
*/}

            </form>

        </div>
    )

}

export default AddMealPage;