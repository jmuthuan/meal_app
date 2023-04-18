import { doc, updateDoc, setDoc, arrayUnion, getDoc } from "firebase/firestore";
import db from "../components/firestoreStart";

const setFirestoreFavorite = async (mealId, userId) =>{

    console.log('add firestore item');
    const docRef = doc(db, 'favorites', userId)
    const docSnap = await getDoc (docRef);
    
    try {
        if(docSnap.exists())
        {
            await updateDoc(docRef,{ 
                idList : arrayUnion(mealId)
          });
        }
        else{
            await setDoc(docRef,{ 
                idList : arrayUnion(mealId)
          }); 
        }       

        console.log("Document written");
        
    } catch (e) {
        console.error("Error adding element: ", e);
    }       
}

export default setFirestoreFavorite;