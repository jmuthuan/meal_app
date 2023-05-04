import { Link, useNavigate, useParams } from "react-router-dom";
import getAuthMeal from "../controllers/getAuthMeal";
import './Header.css';
import userImage from '../img/user-avatar.svg';
import bootstrap from 'bootstrap';

const Header = (props) => {

    let avatarImage = userImage;
    const navigate = useNavigate();

    //breadCrumb Configs
    const dinamicParam = useParams();
    let breadCrumbArray = [];

    switch (props.breadCrumb) {
        case 1:
            breadCrumbArray.push({ name: 'Home' })
            break;
        case 2:
            breadCrumbArray.push({ name: 'Home', path: '/' }, { name: dinamicParam['categorieName'] });
            break;
        case 3:
            breadCrumbArray.push({ name: 'Home', path: '/' },
                { name: dinamicParam['categorieName'], path: `/categorie/${dinamicParam['categorieName']}` },
                { name: props.mealName }
            );
            break;
        case 4:
        case 5:
        case 6:
            breadCrumbArray.push({ name: 'Home', path: '/' }, { name: 'Add Your Meal' });
            break;
        case 7:
            breadCrumbArray.push({ name: 'Home', path: '/' }, { name: 'My Favorites' });
            break;
        case 8:
            breadCrumbArray.push({ name: 'Home', path: '/' },
                { name: 'My Favorites', path: `/favoriteUserMeals/${dinamicParam['userId']}` },
                { name: props.mealName }
            );
            break;
        case 9:
            breadCrumbArray.push({ name: 'Home', path: '/' }, { name: 'About' })
            break;

        case 10:
            breadCrumbArray.push({ name: 'Home', path: '/' }, { name: 'Results' })
            break;

        case 11:
            breadCrumbArray.push({ name: 'Home', path: '/' },
                { name: 'Results', path: '/searchResults' },
                { name: props.mealName });
            break;
        default:
            break;
    }


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
        navigate(`/favoriteUserMeals/${props.user.uid}`)

    }

    const addMeal = () => {
        console.log('TO-DO add personal meal');
        navigate(`/addMeal/${props.user.uid}`);
    }

    if (props.isLoggedIn) {
        avatarImage = props.user.photoURL ? props.user.photoURL : userImage;
    }

    const searchMyMeal = (e) => {
        e.preventDefault();
        const searchBarValue = e.target.search_bar.value;
        const searchByValue = e.target.searchBy['value'];

        props.onClickSearchBar(searchBarValue, searchByValue);

        navigate(`/searchResults`);
    }


    return (
        <header className="App-header">
            <div className="header_wrapper">
                <div className="search_wrapper">
                    <form className="search_meal_form" onSubmit={searchMyMeal}>
                        <input type="text" className="search_bar" id="search_bar" placeholder="Search a meal!" />
                        <button type="submit"> Search!</button>
                        <label>Search meal by: </label>
                        <input type="radio" id="mealName" name={'searchBy'} value={'name'} defaultChecked />
                        <label htmlFor="mealName">Name</label>
                        <input type="radio" id="mainIngredient" name={'searchBy'} value={'ingredient'} />
                        <label htmlFor="mainIngredient">Main Ingredient</label>
                    </form>

                </div>

                <div className="login_wrapper">
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

                {props.isLoggedIn && <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img className="img_avatar" src={avatarImage} alt="user avatar" />
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

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        {
                            breadCrumbArray && breadCrumbArray.map(element => {
                                return (
                                    <li
                                        key={element.name}
                                        className={`breadcrumb-item ${element.path ? '' : 'active'}`}>                                        
                                        {element.path ? <Link to={element.path}>{element.name}</Link>  : element.name}
                                        
                                    </li>
                                )
                            })
                        }
                    </ol>
                </nav>

            </div>
        </header>
    )
}

export default Header;