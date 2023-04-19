import { Link } from "react-router-dom";
import { FaStar, FaRegStar } from 'react-icons/fa';
import setFirestoreData from "../controllers/setFirestoreData";
import currentUser from "../controllers/currentUser";
import deleteFirestoreData from "../controllers/deleteFirestoreData";
import { useState } from "react";




const MealCard = (props) => {
   
      const [isFavorite, setIsFavorite] = useState(props.isFavorite);      
      

    const favoriteToggle = () => {
       /*  console.log('Toggle favorite'); */        

        if(props.userId && !isFavorite){
            setFirestoreData(props.mealId, 'favorites', props.userId);
            setIsFavorite(true);            

        }else if(props.userId && isFavorite){
            deleteFirestoreData(props.mealId, 'favorites', props.userId);
            setIsFavorite(false);            
        }else       
        {
            alert('You must be logged in to add/remove your favorite meals');
        }        
    }

    return (        
        <div className="meal_card_wrapper">
            
            <Link to={`/categorie/${props.mealCategory}/${props.mealId}`}>
            <img src={props.mealImage} alt={`of ${props.nameMeal} meal`} />   
            <h2>{props.nameMeal}</h2>  
            </Link>          
            <span onClick={favoriteToggle} style={{ zIndex: 10 }}>
                {isFavorite ? <FaStar /> : <FaRegStar />}               
            </span>            

        </div>

    )
}

export default MealCard;