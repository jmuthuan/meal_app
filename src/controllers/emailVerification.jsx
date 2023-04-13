import { getAuth, sendEmailVerification } from "firebase/auth";
//import firebaseStart from "../components/firebaseStart";

export function emailVerification(auth){
    /* const app = firebaseStart();
    const auth = getAuth(app); */
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        alert('check your email for validation...');
      });
}