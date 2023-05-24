import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import db from "./firestoreStart";

const deleteFirestoreData = async (data, userCollection, userId) =>{       

    try {
        await updateDoc(doc(db, userCollection, userId),{ 
                idList : arrayRemove(data)
          }); 
        
    } catch (e) {
        console.error("Error removing element: ", e);
    }       
}

export default deleteFirestoreData;