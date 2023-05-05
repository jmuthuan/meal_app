import { doc, updateDoc, setDoc, arrayUnion, getDoc } from "firebase/firestore";
import db from "./firestoreStart";

const setFirestoreData = async (data, userCollection, userId) =>{

    console.log('add firestore item');
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

        console.log("Document written");
        
    } catch (e) {
        console.error("Error adding element: ", e);
    }       
}

export default setFirestoreData;