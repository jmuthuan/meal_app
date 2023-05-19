import { getAuth, updateEmail } from "firebase/auth";
import firebaseStart from "./firebaseStart";
import { emailVerification } from "./emailVerification";
import customSweetAlert from "./sweetAlert";

export function updateUserEmail(email) {
    const app = firebaseStart();
    const auth = getAuth(app);

    //updateEmail(auth.currentUser, email).then(() => {
    updateEmail(auth.currentUser, email).then(() => {
        // Email updated!
        //alert('Email updated!');
        customSweetAlert('','Email Updated','success');        
        emailVerification(auth);
        // ...
      }).catch((error) => {
        // An error occurred
        //alert('An error occurred. Please try later...');
        customSweetAlert('Email error','An error occurred. Please try later...','error');
        // ...
      });
}