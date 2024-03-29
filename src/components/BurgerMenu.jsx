import { useNavigate } from 'react-router-dom';
import './BurgerMenu.css';


import { stack as Menu } from 'react-burger-menu';



const BurgerMenu = (props) => {

    const navigate = useNavigate();

    const onClickNavigate = (path) => {
        navigate(path);
    }


    return (
        <Menu>
            <>
                {props.isLoggedIn && <img className="img_avatar_burger" src={props.avatarImage} alt="user avatar" />}

                <button type='button' id="home" className="menu-item" onClick={() => onClickNavigate('/')}>Home</button>
                {props.isLoggedIn &&
                    <button type='button' id='favorites' className="menu-item" onClick={() => onClickNavigate(`/favoriteUserMeals/${props?.userId}`)}>My Favorite Meals</button>}
                {props.isLoggedIn &&
                    <button type='button' id='add_meal' className="menu-item" onClick={() => onClickNavigate(`/addMeal/${props?.userId}`)}>Add a Meal</button>}
                {props.isLoggedIn &&
                    <button type='button' id='edit_profile' className="menu-item" onClick={() => onClickNavigate(`/updateProfile/${props?.userId}`)}>Edit My Profile</button>}
                <button type='button' id="about" className="menu-item" onClick={() => onClickNavigate("/about")}>About</button>
                <br />
                {props.isLoggedIn &&
                    <button type='button' id='log_out' className="menu-item" onClick={props.logOut}>Log Out</button>}

            </>
        </Menu >
    )

}

export default BurgerMenu;