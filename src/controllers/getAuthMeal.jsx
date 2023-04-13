import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'


const getAuthMeal = (buttonName, email, password) => {
    //App Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBEjJf27Qpa9aadYvq-WlKq7Sx-9xlY-lk",
        authDomain: "jmuthuan-meal-app.firebaseapp.com",
        projectId: "jmuthuan-meal-app",
        storageBucket: "jmuthuan-meal-app.appspot.com",
        messagingSenderId: "359325443334",
        appId: "1:359325443334:web:2c827451c81c9b05832a87",
        measurementId: "G-Z6TJM5ET7W"
    };

    console.log('button: ' + buttonName);
    /* console.log('email: ' + email);
    console.log('password: ' + password); */

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

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
    signInWithEmailAndPassword(auth, email, password)
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