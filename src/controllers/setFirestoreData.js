import { doc, updateDoc, setDoc, arrayUnion, getDoc } from "firebase/firestore";
import db from "./firestoreStart";
import customSweetAlert from "./sweetAlert";

const setFirestoreData = async (data, userCollection, userId) =>{
    
    const docRef = doc(db, userCollection, userId)
    const docSnap = await getDoc (docRef);
    
    try {
        if(docSnap.exists())
        {
            await updateDoc(docRef,{ 
                idList : arrayUnion(data)
          });
        }
        else{
            await setDoc(docRef,{ 
                idList : arrayUnion(data)
          }); 
        }       

        //console.log("Document written");
        
    } catch (e) {
        //console.error("Error adding element: ", e);
        customSweetAlert('','An error occurred. Please try later...','error')
    }       
}

export default setFirestoreData;