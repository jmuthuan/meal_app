import noImage from '../img/No_Image_Available.jpg';
import { FaHeart } from 'react-icons/fa';

const LoadingMealCard = () => {

    return (
        <div className="meal_card_wrapper">
            <div className="image_wrapper">
                <img className="card_image" src={noImage} alt={`of loading meal`} />
                <span className="favorite_icon">
                    <FaHeart />
                </span>
            </div>

            <h3 className="card_name">Loading...</h3>

        </div>
    )
}

export default LoadingMealCard;