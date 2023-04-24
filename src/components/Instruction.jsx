import { useEffect, useState } from 'react';
import {  FaEdit, FaTrashAlt, FaCheck } from 'react-icons/fa'

const Instruction = (props) => {

    const [edit, setEdit] = useState(false);
    //const [add, setAdd] = useState(false);
    const [confirm, setConfirm] = useState(true);
    const [trash, setTrash] = useState(false);
    const [showInput, setShowInput] = useState(props.showInput);
    const [actualInstruction, setActualInstruction] = useState(props.instructions)

    //let textInstruction = props.instructions;
    //console.log(textInstruction);

    useEffect(() => {
        setActualInstruction(props.instructions);
        //setShowInput(props.showInput);
        console.log('rendering instructions');
        

    }, [props.stepInstruction, confirm, props.showInput])


    const deleteInstruction = () => {        
        props.deleteInstruction(props.actualStepInstruction);        
    }

    const confirmInstruction = () => {
        const inputValue = document.getElementById(`mealInstructions${props.actualStepInstruction}`).value;
        
        if (true || inputValue.length > 10) {
            props.confirmInstruction(inputValue, props.actualStepInstruction);
           /*  setConfirm(false);
            setEdit(true);
            setTrash(true);
            setShowInput(false); */
        } else {
            alert('Instruction too short, please verify!');
        }
    }

    const editInstruction = () => {        
        props.editInstruction(props.actualStepInstruction);
    }


    const actualInstructionChange = (e) => {
        setActualInstruction(e.target.value);
    }


    return (
        <>
            <input
                type="text"
                id={`mealInstructions${props.actualStepInstruction}`}
                placeholder={`Step ${props.actualStepInstruction + 1}`}
                className={`input ${props.itemState.showInput ? 'showItem' : 'hideItem'}`}
                value={actualInstruction}
                onChange={actualInstructionChange}
            />
            <span
                className={`text_instruction ${!props.itemState.showInput ? 'showItem' : 'hideItem'}`}>
                {props.instructions}</span>
            {/* <FaPlusSquare
                className={`icon ${add ? 'showItem' : 'hideItem'}`}
                onClick={addInstruction} /> */}
            <FaCheck
                className={`icon ${props.itemState.confirm ? 'showItem' : 'hideItem'}`}
                onClick={confirmInstruction} />
            <FaEdit
                className={`icon ${props.itemState.edit ? 'showItem' : 'hideItem'}`}
                onClick={editInstruction} />
            <FaTrashAlt
                className={`icon ${props.itemState.trash ? 'showItem' : 'hideItem'}`}
                onClick={deleteInstruction} />

            <br />

        </>
    )
}

export default Instruction;