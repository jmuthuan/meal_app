import { updateUserProfile } from "../controllers/updateUserProfile";
import { updateUserEmail } from '../controllers/updateUserEmail'
import setFirestoreData from "../controllers/setFirestoreData";
import { useParams } from "react-router-dom";
import './UpdateUserData.css';

const UpdateUserData = (props) => {


    const { userId } = useParams();

    const updateData = (event) => {
        event.preventDefault();
        const name = event.target.displayName.value;
        const photo = event.target.photoURL.files[0];
        const email = event.target.newEmail.value;

        console.log('photo??');
        console.log(event.target.files);
        console.log(photo);

        if (name || photo) {
            updateUserProfile(name, photo, props.user, props.app, props.auth);
        }


        if (email) {
            updateUserEmail(email);
        }

        /* if(photo){
            setFirestoreData(photo, 'user_photos', userId )
        } */
    }

    console.log(userId);
    console.log(props.user);

    return (
        <main>
            <div className="main_wrapper">
                <h2>Edit Your Profile</h2>
                <div className="update_user_data_wrapper">

                    <form className="update_profile_form" onSubmit={updateData}>
                        <label
                            className="form_item_profile"
                            htmlFor="inputDisplayName">New Display Name: </label>
                        <input
                            className="form_item_input"
                            type="text"
                            id="inputDisplayName"
                            name="displayName" />

                        <label
                            className="form_item_profile"
                            htmlFor="inputPhotoURL">New Photo</label>
                        <input
                            className="form_item_profile label_input_photo"
                            type="file"
                            id="inputPhotoURL"
                            name="photoURL"
                            accept="image/png, image/jpeg"
                        />
                        <label
                            className="form_item_profile"
                            htmlFor="inputEmail">New Email</label>
                        <input
                            className="form_item_input"
                            type="email"
                            id="inputEmail"
                            name="newEmail" />
                        <button
                            className="form_item_profile save_profile_button"
                            type="submit"
                        >Update!</button>

                    </form>
                </div>
            </div>
        </main>

    )
}

export default UpdateUserData;