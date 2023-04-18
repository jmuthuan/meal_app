import { getFirestore } from "firebase/firestore";
import firebaseStart from "./firebaseStart";

// Initialize Firebase
const app = firebaseStart();


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

console.log('firestore app...');
console.log(app);

export default db;