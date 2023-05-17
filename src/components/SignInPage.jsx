import { useNavigate } from "react-router-dom";
import getAuthMeal from "../controllers/getAuthMeal";
import { useEffect } from "react";
import './SignInPage.css';

const SingInPage = (props) => {

    const navigate = useNavigate();

    const randomMeal = Math.floor(Math.random() * 6) + 1;
 


    useEffect(() => {
        if (props.isLoggedIn) {
            navigate('/');
        }
    }, [props.isLoggedIn])

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
        <main>
            <div className="main_wrapper">
                <div className="main_login_wrapper">
                    <div className="img_meal_wrapper">
                    <img src={`img/meals/meal_${randomMeal}.png`} alt='random meal' />
                    </div>
                    <h2 className="sing_in_title">Sign in</h2>

                    <div className="login_wrapper">

                        <form className="form_login" onSubmit={logInEvent}>
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
                                className="login_button_submit"
                                name='button'
                                value='login'>Log In</button>}
                        </form>

                        <h2 className="sing_up_title">Or create an account</h2>

                        {!props.isLoggedIn && <button
                            type="submit"
                            className="singup_button_submit"
                            onClick={singUpEvent}
                            name='button'
                            value='singup'>Sing Up</button>}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SingInPage;