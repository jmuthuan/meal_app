import { doc, getDoc } from "firebase/firestore";
import db from "../components/firestoreStart";

const getFirestoreData = async (userCollection, userId) => {
    console.log('testing favorites: '+userId);
    
    const docRef = doc(db, userCollection, userId)
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      //console.log("Document data:",  docSnap.data().idList);
      return docSnap.data().idList;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
}

export default getFirestoreData;