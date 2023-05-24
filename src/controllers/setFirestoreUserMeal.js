import db from "./firestoreStart";
import { doc, setDoc} from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import firebaseStart from "./firebaseStart";
import customSweetAlert from "./sweetAlert";

const setFirestoreUserMeal = async (data, userCollection, userId, dataId) => {     
   
    const docRef = doc(db, userCollection, userId, 'userMeals', `${dataId}`);   
    
    const app = firebaseStart();
    //const auth = getAuth(app);

    const storage = getStorage(app);
    const storageRef = ref(storage, `/users_meals_photos/${userId}/${dataId}`);   
    

    //store meal picture
    if(data.strMealThumb){

        // Create the file metadata             
        const metadata = {
            contentType: 'image/jpeg'
        };

        const task = uploadBytesResumable(storageRef, data.strMealThumb, metadata);

        task.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                console.log(error.message)
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(task.snapshot.ref).then((downloadURL) => {             
                    data.strMealThumb = downloadURL;

                    try {
                        setDoc(docRef, data);
                    } catch (error) {
                        console.error("Error adding meal: "+ error);
                    }
                });
            }
        );

    } else{
        data.strMealThumb = '';
        try {
            await setDoc(docRef, data);
        } catch (error) {
            console.error("Error adding meal: "+ error);
        } 
    }

    customSweetAlert('Thumbs Up','You add a new meal','success');

}

export default setFirestoreUserMeal;