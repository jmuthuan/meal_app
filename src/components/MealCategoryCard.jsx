import { useState } from 'react';
import './MealCategoryCard.css';
import { useNavigate } from 'react-router-dom';
import customSweetAlert from '../controllers/sweetAlert';

const MealCategoryCard = (props) => {
    const [hover, setHover] = useState(false);

    const navigate = useNavigate(); 

    const onClickCategory = () => {
        
        if(props.name==='Beef' || props.isLoggedIn){
            navigate(`categorie/${props.name}`);
        }
        else{            
            customSweetAlert('Log In or create a free account','You must be logged in to gain full access!!!','info');            
        }        
    }

    return (
        <div className={`card_wrapper`}
            onMouseEnter={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
            onClick={onClickCategory}
            aria-disabled={props.enabled ? 'false' : 'true'}
        >
            <img
                className={`card_image ${!hover ? 'image_show' : ''}`}
                src={props.image}
                alt={`of ${props.name} meal`} />

            <div
                className={`card_name ${hover ? 'name_show' : ''}`}>{props.name}
            </div>
        </div>
    )
}

export default MealCategoryCard;