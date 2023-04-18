import { getAuth } from "firebase/auth";

const currentUser = () =>{
    
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      // User is signed in
      console.log('current user signed in: '+ user.uid);
     /*  console.log(user.uid); */
      return user.uid;
    } else {
      // No user is signed in.
      console.log('No user logged In');
      return null;
    }
}

export default currentUser;