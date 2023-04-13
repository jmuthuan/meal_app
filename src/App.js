import './App.css';
import Header from './components/Header';
import MealCategories from './components/MealCategories';
import { useState } from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SingUpPage from './components/SingUpPage';
import Footer from './components/Footer';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseStart from "./components/firebaseStart";
import UpdateUserData from './components/UpdateUserData';

function App() {

  const [user, setUser] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);


  const app = firebaseStart();
  const auth = getAuth(app);

  const logIn = () => {
    console.log("testing firebase auth");
    //const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        console.log('dir');
        console.dir(user);
        setUser(user);
        setLoggedIn(true);

      } else {
        // User is signed out    
        console.log('not user...signed out');
      }
    });
  }

  const logOut = () => {
    setUser(null);
    setLoggedIn(false);
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<>
              <Header
                user={user}
                isLoggedIn={isLoggedIn}
                mainLogOut={logOut}
                mainLogIn={logIn}
              />
              <MealCategories
                user={user}
                isLoggedIn={isLoggedIn}
              />
              <Footer />
            </>}
          />
          <Route
            path='/singup'
            element={<SingUpPage />}
          />
          <Route
            path='/updateProfile/:userId'
            element={<UpdateUserData />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
