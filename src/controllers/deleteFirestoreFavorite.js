import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import db from "../components/firestoreStart";

const deleteFirestoreFavorite = async (mealId, userId) =>{   
    console.log('delete item firestore');

    try {
        await updateDoc(doc(db, 'favorites', userId),{ 
                idList : arrayRemove(mealId)
          }); 

          console.log("Document updated");
        
    } catch (e) {
        console.error("Error removing element: ", e);
    }       
}

export default deleteFirestoreFavorite;