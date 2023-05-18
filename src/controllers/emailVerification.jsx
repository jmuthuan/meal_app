import { getAuth, sendEmailVerification } from "firebase/auth";
//import firebaseStart from "../components/firebaseStart";

export function emailVerification(auth){
    /* const app = firebaseStart();
    const auth = getAuth(app); */
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        alert('Please click the link that has been sent to your email account to verify your email and gain full access to the site.');
      });
}