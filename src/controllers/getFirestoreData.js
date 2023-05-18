import { doc, getDoc } from "firebase/firestore";
import db from "./firestoreStart";

const getFirestoreData = async (userCollection, userId) => {    
    
    const docRef = doc(db, userCollection, userId)
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {      
      return docSnap.data().idList;
    } else {      
      return null;
    }
}

export default getFirestoreData;