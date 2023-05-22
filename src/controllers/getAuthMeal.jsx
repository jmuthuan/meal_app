//import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence } from 'firebase/auth'
import { emailVerification } from './emailVerification';
import firebaseStart from './firebaseStart';
import customSweetAlert from './sweetAlert';


const getAuthMeal = (buttonName, email, password) => {
    // Initialize Firebase
    const app = firebaseStart();

    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);

    //New Users
    if (buttonName === 'singup') {
        newUser(email, password);
    } else if (buttonName === 'login') {
        logInInUser(email, password);       
    } else if (buttonName === 'logout') {
        logOut();
    }
}

const newUser = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...                     
            emailVerification(auth);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.warn(errorCode + ": " + errorMessage);
        });
}

const logInInUser = (email, password) => {
    let auth = getAuth();
    setPersistence(auth, browserSessionPersistence)
        .then(() => {
            return signInWithEmailAndPassword(auth, email, password)
        })
        .then((userCredential) => {
            // Signed in                       
            
            if(!userCredential.user.emailVerified){   
                auth = getAuth();                 
                customSweetAlert('Please verify your email before login','Please click the link that has been sent to your email account to verify your email and gain full access to the site.','info-footer');
            }
        })
        .catch((error) => {
            const errorCode = error.code; 
            customSweetAlert('Authentication Error','an error has occured:  '+ errorCode ,'error')  
        });
}

const logOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
      
    }).catch((error) => {
        // An error happened.
        console.warn(error);
    });
}

export default getAuthMeal;