import { useEffect, useState } from 'react';
import './MealCard.css';

const MealCard = (props) => {
    const [hover, setHover] = useState(false);

    useEffect(() => {

    }, [hover])


    return (
        <div className={`card_wrapper`}
            onMouseEnter={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
            aria-disabled={props.enabled? 'false':'true'}
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

export default MealCard;