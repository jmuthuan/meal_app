import { updateUserProfile } from "../controllers/updateUserProfile";
import {updateUserEmail} from '../controllers/updateUserEmail'
import setFirestoreData from "../controllers/setFirestoreData";
import { useParams } from "react-router-dom";

const UpdateUserData = (props) => {

    /*  const loadImage = (event) => {
         //event.preventDefault();
         console.log('TO-DO - upload image');
     } */

    const {userId} = useParams(); 

    const updateData = (event) => {
        event.preventDefault();
        const name = event.target.displayName.value;
        const photo = event.target.photoURL.files[0];
        const email = event.target.newEmail.value;

        console.log('photo??');
        console.log(event.target.files);
        console.log(photo);

        if(name || photo){
            updateUserProfile(name, photo, props.user, props.app, props.auth);
        }
        

        if(email){
            updateUserEmail(email);
        } 

        /* if(photo){
            setFirestoreData(photo, 'user_photos', userId )
        } */
    }

    console.log(userId);
    console.log(props.user);

    return (
        <div className="update_user_data_wrapper">

            <form onSubmit={updateData}>
                <label
                    className="form_item"
                    htmlFor="inputDisplayName">New Display Name: </label>
                <input
                    className="form_item"
                    type="text"
                    id="inputDisplayName"
                    name="displayName" />

                <label
                    className="form_item"
                    htmlFor="inputPhotoURL">New Photo</label>
                <input
                    className="form_item"
                    type="file"
                    id="inputPhotoURL"
                    name="photoURL"
                    accept="image/png, image/jpeg"                    
                />
                <label
                    className="form_item"
                    htmlFor="inputEmail">New Email</label>
                <input 
                    className="form_item"
                    type="email"
                    id="inputEmail"
                    name="newEmail" />
                <button
                    className="form_item"
                    type="submit"
                >Update!</button>

            </form>
        </div>
    )
}

export default UpdateUserData;