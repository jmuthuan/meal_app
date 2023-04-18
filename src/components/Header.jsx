import { useNavigate } from "react-router-dom";
import getAuthMeal from "../controllers/getAuthMeal";
import './Header.css';
import userImage from '../img/user-avatar.svg';
import bootstrap from 'bootstrap';

const Header = (props) => {

    const navigate = useNavigate();
    //LogIn Form - LogOut
    const logInEvent = (event) => {
        event.preventDefault();
        getAuthMeal(event.target.button.value, event.target.email.value, event.target.password.value);
        props.mainLogIn();
    }

    //singUp 
    const singUpEvent = (event) => {
        event.preventDefault();

        console.log("SingUp Event...")
        navigate('/singup');

    }
    //Log Out
    const logOutEvent = (event) => {
        event.preventDefault();
        getAuthMeal(event.target.value, "", "");
        props.mainLogOut();
    }

    //edit Profile
    const editProfile = (event) => {
        event.preventDefault();
        navigate(`/updateProfile/${props.user.uid}`);
    }

    //favorite user Meals
    const favoriteMeals = () => {
        //event.preventDefault();
        console.log('TO-DO navigate to user favorite meals')
        //TO-DO navigate to user favorite meals
    }

    const addMeal = () =>{
        console.log('TO-DO add personal meal');
    }

    return (
        <header className="App-header">
            <div className="header_wrapper">
                <input type="text" className="search_bar" placeholder="Search a meal!" />
                <div className="login_wrapper">
                    <form onSubmit={logInEvent}>
                        <input
                            type='email'
                            className="email_login"
                            name='email'
                            placeholder="email"
                            required />
                        <input
                            type='password'
                            className="password_login"
                            name="password"
                            placeholder="password"
                            required />

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

                {props.isLoggedIn && <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={userImage} alt="user avatar" />
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={favoriteMeals}>My Favorite Meals</button></li>
                        <li>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={addMeal}>Add a Meal</button></li>
                        <li>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={editProfile}>Edit my profile</button></li>
                        <li>
                            <button
                                className="dropdown-item logout_button"
                                type="submit"
                                onClick={logOutEvent}
                                name="button_logout"
                                value='logout' >Log Out</button></li>
                    </ul>
                </div>}

            </div>
        </header>
    )
}

export default Header;