import { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaCheck } from 'react-icons/fa'
import customSweetAlert from '../controllers/sweetAlert';

const Instruction = (props) => {

    const [actualInstruction, setActualInstruction] = useState(props.instructions)

    useEffect(() => {       
        setActualInstruction(props.instructions);
    }, [props.stepInstruction, props.instructions, props.showInput])


    const deleteInstruction = () => {
        props.deleteInstruction(props.actualStepInstruction);
    }

    const confirmInstruction = () => {
        const inputValue = document.getElementById(`mealInstructions${props.actualStepInstruction}`).value;

        if (inputValue.length > 10) {
            props.confirmInstruction(inputValue, props.actualStepInstruction);           
        } else {
            customSweetAlert('Instruction too short', 'please verify!', 'error');
        }
    }

    const editInstruction = () => {
        props.editInstruction(props.actualStepInstruction);
    }

    const actualInstructionChange = (e) => {
        setActualInstruction(e.target.value);
    }


    return (
        <><tr>
            <td>
                <input
                    type="text"
                    id={`mealInstructions${props.actualStepInstruction}`}
                    placeholder={`Step ${props.actualStepInstruction + 1}`}
                    className={`inputInstruction ${props.itemState.showInput ? 'showItem' : 'hideItem'}`}
                    value={actualInstruction}
                    onChange={actualInstructionChange}
                />
                <p
                    className={`text_instruction ${!props.itemState.showInput ? 'showItem' : 'hideItem'}`}>
                    {props.instructions}</p>
            </td>
            <td>
                <FaCheck
                    className={`icon ${props.itemState.confirm ? 'showItem' : 'hideItem'}`}
                    onClick={confirmInstruction} />
                <FaEdit
                    className={`icon ${props.itemState.edit ? 'showItem' : 'hideItem'}`}
                    onClick={editInstruction} />
                <FaTrashAlt
                    className={`icon ${props.itemState.trash ? 'showItem' : 'hideItem'}`}
                    onClick={deleteInstruction} />
            </td>
        </tr>
        </>
    )
}

export default Instruction;