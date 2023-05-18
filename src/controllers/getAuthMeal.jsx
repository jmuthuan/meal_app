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
            console.log('Signed In!!!');
            console.log(userCredential); 
            
            if(userCredential.user.emailVerified){
                console.log('email verified')
            }
            else{
                console.log('email not verified');
                alert('Please click the link that has been sent to your email account to verify your email and gain full access to the site.');                
                //logOut();
            }
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            /* const errorMessage = error.message;
            console.dir(error)
            console.warn(errorCode);
            console.log(errorMessage);// + ": " + errorMessage); */    
            alert('an error has occured:  '+ errorCode);        
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