// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
function firebaseStart() {

  const firebaseConfig = {
    apiKey: "AIzaSyBEjJf27Qpa9aadYvq-WlKq7Sx-9xlY-lk",
    authDomain: "jmuthuan-meal-app.firebaseapp.com",
    projectId: "jmuthuan-meal-app",
    storageBucket: "jmuthuan-meal-app.appspot.com",
    messagingSenderId: "359325443334",
    appId: "1:359325443334:web:2c827451c81c9b05832a87",
    measurementId: "G-Z6TJM5ET7W"
  };

  // Initialize Firebase 
  return initializeApp(firebaseConfig);
}

export default firebaseStart;