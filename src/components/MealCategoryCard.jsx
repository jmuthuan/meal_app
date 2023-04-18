import { useState } from 'react';
import './MealCategoryCard.css';
import { useNavigate } from 'react-router-dom';

const MealCategoryCard = (props) => {
    const [hover, setHover] = useState(false);

    const navigate = useNavigate();
    /* useEffect(() => {

    }, [hover]) */


    const onClickCategory = () => {
        navigate(`categorie/${props.name}`);
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