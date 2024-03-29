import { useNavigate } from "react-router-dom";
import getAuthMeal from "../controllers/getAuthMeal";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useState } from "react";
import './SignUpPage.css';
import customSweetAlert from "../controllers/sweetAlert";

const SingUpPage = () => {
    const [passLength, setPassLength] = useState(false);
    const [passLower, setPassLower] = useState(false);
    const [passUpper, setPassUpper] = useState(false);
    const [passNumber, setPassNumber] = useState(false);
    const [passSpecial, setPassSpecial] = useState(false);

    const [randomMeal, setRandomMeal] = useState(Math.floor(Math.random() * 6) + 1);
    
    const navigate = useNavigate();

    const singUp = (event) => {
        event.preventDefault();

        const passwordRules = [passLength, passLower, passUpper, passNumber, passSpecial];

        if (passwordCheck(event.target, passwordRules)) {
            getAuthMeal('singup', event.target.email.value, event.target.password.value);
            navigate('/');
        }

    }

    const passwordRules = (event) => {
        event.preventDefault();

        //length
        if (event.target.value.length > 7) {
            setPassLength(true);
        } else (
            setPassLength(false)
        )

        //lowerCase        
        if (event.target.value.split('').some((char) => (/[a-z]/.test(char)))) {
            setPassLower(true)
        }
        else {
            setPassLower(false)
        }

        //upperCase
        if (event.target.value.split('').some((char) => (/[A-Z]/.test(char)))) {
            setPassUpper(true)
        } else {
            setPassUpper(false)
        }

        //Number
        if (event.target.value.split('').some((char) => (/[0-9]/.test(char)))) {
            setPassNumber(true)
        } else {
            setPassNumber(false)
        }

        //Special        
        if (event.target.value.split('').some((char) => (/(?=.*\D)[*.!@#$%^&(){}[\]:;<>,.?\/~_+-=|\\]/.test(char)))) {
            setPassSpecial(true)
        } else {
            setPassSpecial(false)
        }

    }

    return (
        <main>
            <div className="main_wrapper">
                <div className="main_singup_wrapper">
                    <div className="img_meal_wrapper">
                        <img src={`img/meals/meal_${randomMeal}.png`} alt='random meal' />
                    </div>

                    <h2 className="sign_up_title">Create your free account!!! </h2>

                    <div className="signup_wrapper">
                        <form className="form_sign_up" onSubmit={singUp}>
                            <input
                                className="input_sign_up"
                                type='text'
                                placeholder="Enter your email"
                                name='email'
                                required />
                            <input
                                className="input_sign_up"
                                type='password'
                                placeholder="Enter your password"
                                name='password'
                                onChange={passwordRules}
                                required />
                            <input
                                className="input_sign_up"
                                type='password'
                                placeholder="Repeat your password"
                                name='password_repeat'
                                required />
                            <button className="sign_up_button" type="submit">Sign Up!!!</button>
                        </form>
                    </div>

                    <div className="password_requirements">
                        <p>Your password must complain the following rules:</p>
                        <ul className="password_rules">
                            <li>8 characters minimum length <span>
                                {passLength ? <FaCheckCircle className="svg_password_rules" color="green" /> : <FaTimesCircle className="svg_password_rules" color="red" />}</span></li>
                            <li>1 lower case <span>
                                {passLower ? <FaCheckCircle className="svg_password_rules" color="green" /> : <FaTimesCircle className="svg_password_rules" color="red" />}</span></li>
                            <li>1 upper case <span>
                                {passUpper ? <FaCheckCircle className="svg_password_rules" color="green" /> : <FaTimesCircle className="svg_password_rules" color="red" />}</span></li>
                            <li>1 number <span>
                                {passNumber ? <FaCheckCircle className="svg_password_rules" color="green" /> : <FaTimesCircle className="svg_password_rules" color="red" />}</span></li>
                            <li>special character <span>
                                {passSpecial ? <FaCheckCircle className="svg_password_rules" color="green" /> : <FaTimesCircle className="svg_password_rules" color="red" />}</span></li>
                        </ul>
                    </div>


                </div>
            </div>
        </main>
    )
}

const passwordCheck = (passwords, rules) => {
    if (rules.every(rule => rule === true)) {
        if ((passwords.password.value === passwords.password_repeat.value)) {            
            //alert("welcome!!!");
            return true;
        } else {
            //alert('Verify your passwords. (Both passwords must match)');
            customSweetAlert('Verify your passwords','Both passwords must match','error');
        }

    } else {
        //alert("Please verify the rules for your password");
        customSweetAlert('Check your Password','Please verify the rules for your password','error')
    }
    //console.log('passwords failure...');
    return false;
}

export default SingUpPage;