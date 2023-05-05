//import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence } from 'firebase/auth'
import { emailVerification } from './emailVerification';
import firebaseStart from './firebaseStart';


const getAuthMeal = (buttonName, email, password) => {

    // Initialize Firebase
    const app = firebaseStart();

    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);

    //New Users
    if (buttonName === 'singup') {
        console.log('singup test...');
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
            console.log('user credentials...');
            console.log(userCredential);
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
    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence)
        .then(() => {
            return signInWithEmailAndPassword(auth, email, password)
        })
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('Signed In!!!');
            console.log(userCredential);

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.warn(errorCode + ": " + errorMessage);
        });
}

const logOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Sign-outSuccessful");
    }).catch((error) => {
        // An error happened.
        console.warn(error);
    });
}

export default getAuthMeal;