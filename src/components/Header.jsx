import { Link, useNavigate, useParams } from "react-router-dom";
import getAuthMeal from "../controllers/getAuthMeal";
import './Header.css';
import userImage from '../img/user-avatar.svg';
import bootstrap from 'bootstrap';
import BurgerMenu from "./BurgerMenu";

const Header = (props) => {

    let avatarImage = userImage;
    const navigate = useNavigate();

    //breadCrumb Configs
    const dinamicParam = useParams();
    let breadCrumbArray = [];
    let hide_items_log_in = false;


    switch (props.breadCrumb) {
        case 1:
            breadCrumbArray = null;
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
            breadCrumbArray.push({ name: 'Home', path: '/' }, { name: 'Log In' });
            hide_items_log_in = true;
            break;

        case 5:
            breadCrumbArray.push({ name: 'Home', path: '/' }, { name: 'Update your profile' });
            break;
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

        case 12:
            breadCrumbArray.push({ name: 'Home', path: '/' }, { name: 'About' })
            break;

        case 13:
            breadCrumbArray.push({ name: 'Home', path: '/' }, { name: 'Sing Up' });
            hide_items_log_in = true;
            break;

        default:
            break;
    }


    //LogIn Form - LogOut
    const logInEvent = () => {
        //event.preventDefault();
        //getAuthMeal(event.target.button.value, event.target.email.value, event.target.password.value);
        //props.mainLogIn();
        navigate('singIn');
    }

    //singUp 
    const singUpEvent = (event) => {
        event.preventDefault();
        navigate('/singup');
    }
    //Log Out
    const logOutEvent = (event) => {
        event.preventDefault();
        getAuthMeal(event.target.value, "", "");
        props.mainLogOut();

        navigate('/');
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
        navigate(`/addMeal/${props.user.uid}`);
    }

    if (props.isLoggedIn) {
        avatarImage = props.user.photoURL ? props.user.photoURL : userImage;
    }

    //search bar onClick
    const searchMyMeal = (e) => {
        e.preventDefault();
        const searchBarValue = e.target.search_bar.value;
        const searchByValue = e.target.searchBy['value'];

        props.onClickSearchBar(searchBarValue, searchByValue);

        navigate(`/searchResults`);
    }


    return (
        <header className="App-header">
            {/*  {console.log('user', props.user)} */}
            <div className="header_wrapper">
                <div className='burger_menu_wrapper'>
                    <BurgerMenu
                        avatarImage={avatarImage}
                        userId={props.user?.uid}
                        isLoggedIn={props.isLoggedIn}
                        logOut={logOutEvent}
                    />
                </div>


                {props.isLoggedIn && <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" id="dropdown_avatar" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img className="img_avatar" src={avatarImage} alt="user avatar" />
                    </button>
                    <ul className="dropdown-menu" id="dropdown-menu">
                        <li key={Math.random()}>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={favoriteMeals}>My Favorite Meals</button></li>
                        <li key={Math.random()}>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={addMeal}>Add a Meal</button></li>
                        <li key={Math.random()}>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={editProfile}>Edit my profile</button></li>
                        <li key={Math.random()}>
                            <button
                                className="dropdown-item logout_button"
                                type="submit"
                                onClick={logOutEvent}
                                name="button_logout"
                                value='logout' >Log Out</button></li>
                    </ul>
                </div>}

                <div className={`login_wrapper ${hide_items_log_in ? 'hide_log_in' : ''}`}>
                    {!props.isLoggedIn && <button
                        type="submit"
                        className="login_button"
                        name='button'
                        value='login'
                        onClick={logInEvent}>Log In</button>}
                </div>

                <span className="about_link"><a href="/about">About</a></span>
                <h1 className="main_title_app"><Link className="main_tittle_app_link" to={'/'}> YumMeal App</Link></h1>



                <div className={`search_wrapper ${hide_items_log_in ? 'hide_log_in' : ''}`}>
                    <form className="search_meal_form" onSubmit={searchMyMeal}>
                        <div className="form_section_bar">
                            <input type="text" className="search_bar" id="search_bar" placeholder="Search a meal!" />
                            <button type="submit" className="search_button"> Search!</button>
                        </div>
                        <div className="form_section_radio">
                            <label className="search_by_label">Search meal by: </label>
                            <input type="radio" id="mealName" name={'searchBy'} value={'name'} defaultChecked />
                            <label htmlFor="mealName">Name</label>
                            <input type="radio" id="mainIngredient" name={'searchBy'} value={'ingredient'} />
                            <label htmlFor="mainIngredient">Main Ingredient</label>
                        </div>
                    </form>

                </div>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb" id="breadcrumb">
                        {
                            breadCrumbArray && breadCrumbArray.map(element => {
                                return (
                                    <li
                                        key={element.name}
                                        className={`breadcrumb-item ${element.path ? '' : 'active'}`}>
                                        {element.path ? <Link to={element.path}>{element.name}</Link> : element.name}

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