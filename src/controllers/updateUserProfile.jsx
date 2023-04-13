import { getAuth, updateProfile } from "firebase/auth";
import firebaseStart from "../components/firebaseStart";

export function updateUserProfile(displayName, photoURL) {
    const app = firebaseStart();
    const auth = getAuth(app);

    console.log('updating profile...');
    console.log(displayName);
    console.log(photoURL);

    updateProfile(auth.currentUser, {
        //displayName: displayName, photoURL: photoURL;
        displayName: displayName, photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
        // Profile updated!
        alert('Profile updated!')
        // ...
    }).catch((error) => {
        alert('An error occurred. Please try later...');
        // An error occurred
        // ...
    });
}