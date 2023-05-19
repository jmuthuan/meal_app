import { getAuth, sendEmailVerification } from "firebase/auth";
import customSweetAlert from "./sweetAlert";

export function emailVerification(auth){ 

    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!        
        customSweetAlert('Email Sent','Please click the link that has been sent to your email account to verify your email and gain full access to the site.','info');
      });
}