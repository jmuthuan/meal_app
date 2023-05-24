import { doc, deleteDoc } from "firebase/firestore";
import db from "./firestoreStart";
import Swal from 'sweetalert2';

const deleteFirestoreUserMeal = async (userCollection, userId, dataId) => {
  
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#F00E0E',
        cancelButtonColor: '#116611',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const docRef = doc(db, userCollection, userId, 'userMeals', `${dataId}`);
            deleteDoc(docRef);

            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )    
        }
    })
}

export default deleteFirestoreUserMeal;

