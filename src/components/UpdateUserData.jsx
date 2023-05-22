import { updateUserProfile } from "../controllers/updateUserProfile";
import { updateUserEmail } from '../controllers/updateUserEmail';
import { FaUpload } from 'react-icons/fa';
import { useNavigate, useParams } from "react-router-dom";
import './UpdateUserData.css';
import { useState } from "react";
import customSweetAlert from "../controllers/sweetAlert";

const UpdateUserData = (props) => {

    const [userPhotoName, setUserPhotoName] = useState('');

    const navigate = useNavigate();

    const { userId } = useParams();

    const updateData = (event) => {
        event.preventDefault();
        const name = event.target.displayName.value;
        const photo = event.target.photoURL.files[0];
        const email = event.target.newEmail.value;

        if(name || photo || email){          
            if (name || photo) {
                updateUserProfile(name, photo, props.user, props.app, props.auth);
            }
    
            if (email) {
                updateUserEmail(email);
            }    
            
            customSweetAlert('','Profile Updated','success');
            navigate('/');
        }

        else{
            customSweetAlert('Empty data','Please complete the data that you want to update','info')
        }
    }

    /* ************************************ */
    const fileUploadClick = () => {
        setUserPhotoName('');
    }

    const fileUpload = (e) => {
        const strUserPhotoName = document.getElementById('inputPhotoURL').files[0];
        if (strUserPhotoName?.name) {
            setUserPhotoName(strUserPhotoName.name);
        }
    }

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

                        <label htmlFor="inputPhotoURL" className="custom_label_upload">
                            <span className="custom_file_upload">
                                <FaUpload />Choose a file...
                            </span>
                            <span className="custom_photo_name">  {userPhotoName}</span>
                        </label>

                        <input
                            className="form_item_profile label_input_photo"
                            type="file"
                            id="inputPhotoURL"
                            name="photoURL"
                            accept="image/png, image/jpeg"
                            onClick={fileUploadClick}
                            onChange={fileUpload}
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