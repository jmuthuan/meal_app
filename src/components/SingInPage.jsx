import { useNavigate } from "react-router-dom";
import getAuthMeal from "../controllers/getAuthMeal";
import { useEffect } from "react";

const SingInPage = (props) => {

    const navigate = useNavigate();


    useEffect(()=>{
        if(props.isLoggedIn){
            navigate('/');
        }
    },[props.isLoggedIn])

    //LogIn Form - LogOut
    const logInEvent = (event) => {
        event.preventDefault();
        getAuthMeal(event.target.button.value, event.target.email.value, event.target.password.value);
        props.mainLogIn();
    }

     //singUp 
     const singUpEvent = (event) => {
        event.preventDefault();        
        navigate('/singup');
    }

    return (
        <div className="login_wrapper">
            <h2>Sign in or create an account</h2>

            <form onSubmit={logInEvent}>
                {!props.isLoggedIn && <input
                    type='email'
                    className="email_login"
                    name='email'
                    placeholder="email"
                    required />}
                {!props.isLoggedIn && <input
                    type='password'
                    className="password_login"
                    name="password"
                    placeholder="password"
                    required />}

                {!props.isLoggedIn && <button
                    type="submit"
                    className="login_button"
                    name='button'
                    value='login'>Log In</button>}
            </form>

            {!props.isLoggedIn && <button
                        type="submit"
                        className="singup_button"
                        onClick={singUpEvent}
                        name='button'
                        value='singup'>Sing Up</button>}
        </div>
    )
}

export default SingInPage;