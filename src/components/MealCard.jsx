import { Link } from "react-router-dom";
import { FaStar, FaRegStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import setFirestoreData from "../controllers/setFirestoreData";
import currentUser from "../controllers/currentUser";
import deleteFirestoreData from "../controllers/deleteFirestoreData";
import { useEffect, useState } from "react";


const MealCard = (props) => {
    const [isFavorite, setIsFavorite] = useState(props.isFavorite);
    const [isUser, setIsUser] = useState(false);
    const [linkPath, setLinkPath] = useState(`/categorie/${props.mealCategory}/${props.mealId}`);


    useEffect(() => {
        if (props.fromFavorites) {
            setLinkPath(`/favoriteUserMeals/${props.userId}/${props.mealId}`);
            setIsUser(true);
        }
        if (props.fromSearch) {
            setLinkPath(`/searchResults/${props.mealId}`);
        }
    }, [])


    const favoriteToggle = (e) => {
        e.preventDefault();
        if (props.userId && !isFavorite) {
            setFirestoreData(props.mealId, 'favorites', props.userId);
            setIsFavorite(true);

        } else if (props.userId && isFavorite) {
            deleteFirestoreData(props.mealId, 'favorites', props.userId);
            setIsFavorite(false);
        } else {
            alert('You must be logged in to add/remove your favorite meals');
        }
    }

    return (
        <div className="meal_card_wrapper">

            <Link to={linkPath} state={{ userMeal: props.userMeals, fullMealData: props.fullMealData }}>
                <div className="image_wrapper">
                    <img className="card_image" src={props.mealImage} alt={`of ${props.nameMeal} meal`} />
                    <span className="favorite_icon" onClick={favoriteToggle}>
                        {isFavorite ? <FaHeart /> : <FaRegHeart />}
                    </span>
                </div>

                <h3 className="card_name">{props.nameMeal}</h3>
            </Link>


        </div>

    )
}

export default MealCard;