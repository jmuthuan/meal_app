import { useNavigate } from "react-router-dom";
import getAuthMeal from "../controllers/getAuthMeal";
import {FaCheckCircle, FaTimesCircle} from 'react-icons/fa';
import { useState } from "react";

const SingUpPage = () => {
    const [passLength, setPassLength] = useState(false);
    const [passLower, setPassLower] =  useState(false);
    const [passUpper, setPassUpper] = useState(false);
    const [passNumber, setPassNumber] = useState(false);
    const [passSpecial, setPassSpecial] = useState(false);


    const navigate = useNavigate();

    const singUp = (event) => {
        event.preventDefault();

        console.log(event.target.email.value);
        console.log(event.target.password.value);
        console.log(event.target.password_repeat.value);

        const passwordRules = [passLength, passLower, passUpper, passNumber, passSpecial];
        
        if(passwordCheck(event.target, passwordRules)){
            getAuthMeal('singup', event.target.email.value, event.target.password.value)
            console.log('passwords check!');
            navigate('/');
        }
       
    }

    const passwordRules = (event) =>{
        event.preventDefault();

        //length
        if(event.target.value.length > 7){
            setPassLength(true);
        }else(
            setPassLength(false)
        )        
        
        //lowerCase        
        if(event.target.value.split('').some((char)=>(/[a-z]/.test(char)))){
            setPassLower(true)
        }
        else{
            setPassLower(false)
        }

        //upperCase
        if(event.target.value.split('').some((char)=>(/[A-Z]/.test(char)))){
            setPassUpper(true)
        }else{
            setPassUpper(false)
        }
        
        //Number
        if(event.target.value.split('').some((char)=>(/[0-9]/.test(char)))){
            setPassNumber(true)
        }else{
            setPassNumber(false)
        }

        //Special        
        if(event.target.value.split('').some((char)=>(/(?=.*\D)[*.!@#$%^&(){}[\]:;<>,.?\/~_+-=|\\]/.test(char)))){
            setPassSpecial(true)
        }else{
            setPassSpecial(false)
        }
        
    }

    return (
        <div className="singup_wrapper">
            <form onSubmit={singUp}>
                <input
                    type='text'
                    placeholder="Enter your email"
                    name='email'
                    required />
                <input
                    type='password'
                    placeholder="Enter your password"
                    name='password'
                    onChange={passwordRules}
                    required />
                <input
                    type='password'
                    placeholder="Repeat your password"
                    name='password_repeat'
                    required />
                <button type="submit">Sing Up!!!</button>
            </form>

            <div className="password_requirements">
                <p>Your password must complain the following rules:</p>
                <ul>
                    <li>8 characters minimum length <span>
                        {passLength? <FaCheckCircle color="green"/>:<FaTimesCircle color="red"/>}</span></li>
                    <li>1 lower case <span>
                        {passLower?<FaCheckCircle color="green"/>:<FaTimesCircle color="red"/>}</span></li>
                    <li>1 upper case <span>
                        {passUpper?<FaCheckCircle color="green"/>:<FaTimesCircle color="red"/>}</span></li>
                    <li>1 number <span>
                        {passNumber?<FaCheckCircle color="green"/>:<FaTimesCircle color="red"/>}</span></li>
                    <li>special character <span>
                        {passSpecial?<FaCheckCircle color="green"/>:<FaTimesCircle color="red"/>}</span></li>
                </ul>
            </div>
        </div>
    )
}

const passwordCheck = (passwords, rules) =>{
    if(rules.every(rule => rule === true)){
        if((passwords.password.value === passwords.password_repeat.value)){
            console.log('passwords OK');
            alert("welcome!!!");
            return true;
        }else{
            alert('Verify your passwords. (Both passwords must match)');
        }

    }else{
        alert("Please verify the rules for your password");        
    }    
    console.log('passwords failure...');
    return false;
}

export default SingUpPage;