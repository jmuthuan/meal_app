import { Link } from "react-router-dom";
import { FaStar, FaRegStar } from 'react-icons/fa';
import setFirestoreFavorite from "../controllers/setFirestoreFavorite";
import currentUser from "../controllers/currentUser";
import deleteFirestoreFavorite from "../controllers/deleteFirestoreFavorite";
import { useState } from "react";




const MealCard = (props) => {
    /*   console.log('Meal Card...');
      console.log(props.mealId);
      console.log(props.mealCategory); */
      //const userId = currentUser();

      const [test_favorite, setFavorite] = useState(false);
      
      

    const favoriteToggle = () => {
       /*  console.log('Toggle favorite'); */        

        if(props.userId && !test_favorite){
            setFirestoreFavorite(props.mealId, props.userId);
            setFavorite(true);

        }else if(props.userId && test_favorite){
            deleteFirestoreFavorite(props.mealId, props.userId);
            setFavorite(false);

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
                {/* {props.isFavorite ? <FaStar /> : <FaRegStar />} */}
                {test_favorite ? <FaStar /> : <FaRegStar />}
            </span>            

        </div>

    )
}

export default MealCard;