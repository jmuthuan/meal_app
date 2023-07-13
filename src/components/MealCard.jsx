import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import setFirestoreData from "../controllers/setFirestoreData";
import currentUser from "../controllers/currentUser";
import deleteFirestoreData from "../controllers/deleteFirestoreData";
import { useEffect, useState } from "react";
import customSweetAlert from "../controllers/sweetAlert";
import noImage from '../img/No_Image_Available.jpg';
import getMealById from "../controllers/getMealById";
import LoadingMealCard from "./LoadingMealCard";


const MealCard = (props) => {
    const [isFavorite, setIsFavorite] = useState(props.isFavorite);
    const [isUser, setIsUser] = useState(false);
    const [linkPath, setLinkPath] = useState(`/categorie/${props.mealCategory}/${props.mealId}`);
    const [isLoading, setIsLoading] = useState(false);
    const [favMealName, setFavMealName] = useState(null);
    const [favImgSrc, setFavImgSrc] = useState(null);

    useEffect(() => {
        if (props.fromFavorites) {
            setLinkPath(`/favoriteUserMeals/${props.userId}/${props.mealId}`);
            setIsUser(true);

            if(!props.mealId.includes('user')){
                getMeal();
            }
        }
        if (props.fromSearch) {
            setLinkPath(`/searchResults/${props.mealId}`);
        }
    }, [])

    useEffect(()=>{
        if(props.mealId.includes('user')){
            setFavImgSrc(props.mealImage || noImage)
        }
    },[])


    const getMeal = async () => {
        setIsLoading(true);
        const {strMeal, strMealThumb} = await getMealById(props.mealId);
        setFavImgSrc(props.mealImage || strMealThumb || noImage);
        setFavMealName(strMeal);
        setIsLoading(false);                
    }

    const favoriteToggle = (e) => {        
        e.preventDefault();
       
        if (props.isLoggedIn && !isFavorite) {
            setFirestoreData(props.mealId, 'favorites', props.userId);
            setIsFavorite(true);

        } else if (props.isLoggedIn && isFavorite) {
            deleteFirestoreData(props.mealId, 'favorites', props.userId);
            setIsFavorite(false);
        } else {            
            customSweetAlert('Log In or create a free account','You must be logged in to add/remove your favorite meals','info');
        }
    }

    if(isLoading) return <LoadingMealCard />

    return (
        <div className="meal_card_wrapper">
            {console.log(props.mealId, props.mealImage)}
            <Link to={linkPath} state={{ userMeal: props.userMeals, fullMealData: props.fullMealData }}>
                <div className="image_wrapper">                  
                    <img className="card_image" src={favImgSrc} alt={`of ${props.nameMeal} meal`} />
                    <span className="favorite_icon" onClick={favoriteToggle}>
                        {isFavorite ? <FaHeart /> : <FaRegHeart />}
                    </span>
                </div>

                <h3 className="card_name">{props.nameMeal || favMealName}</h3>
            </Link>

        </div>

    )
}

export default MealCard;