import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import db from "./firestoreStart";

const deleteFirestoreData = async (data, userCollection, userId) =>{   
    console.log('delete item firestore');

    try {
        await updateDoc(doc(db, userCollection, userId),{ 
                idList : arrayRemove(data)
          }); 

          console.log("Document updated");
        
    } catch (e) {
        console.error("Error removing element: ", e);
    }       
}

export default deleteFirestoreData;