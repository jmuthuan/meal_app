import { getAuth, updateProfile } from "firebase/auth";
import firebaseStart from "../components/firebaseStart";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

export function updateUserProfile(displayName, photoURL, user, app, auth) {
    /* const app = firebaseStart();
    const auth = getAuth(app); */

    const storage = getStorage(app);
    const storageRef = ref(storage, `/user_photos/${user.uid}`);    

    console.log('updating profile...');

    //Photo update
    if (photoURL) {
        console.log('updating photo');

        // Create the file metadata             
        const metadata = {
            contentType: 'image/jpeg'
        };

        const task = uploadBytesResumable(storageRef, photoURL, metadata);

        task.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                /* switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                } */
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                console.log(error.message)
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(task.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    
                    updateProfile(auth.currentUser, {  
                        photoURL: downloadURL
                    }).then(() => {
                        // Profile updated!
                        console.log('Photo updated!')
                        // ...
                    }).catch((error) => {
                        alert('An error occurred. Please try later...');
                        // An error occurred
                        // ...
                    });
                });
            }
        );
    } 

    if(displayName){
        updateProfile(auth.currentUser, {            
            displayName: displayName           
        }).then(() => {
            // Profile updated!
            console.log('Name updated!')
            // ...
        }).catch((error) => {
            alert('An error occurred. Please try later...');
            // An error occurred
            // ...
        });
    }

}