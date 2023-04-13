import { Link } from "react-router-dom";

const MealCard = (props) => {
  /*   console.log('Meal Card...');
    console.log(props.mealId);
    console.log(props.mealCategory); */

    return (
        <Link to={`/categorie/${props.mealCategory}/${props.mealId}`}>
            <div className="meal_card_wrapper">
                <img src={props.mealImage} alt={`of ${props.mealName} meal`} />
                <h2>{props.nameMeal}</h2>
            </div>
        </Link>
    )
}

export default MealCard;