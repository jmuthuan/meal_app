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
import MealList from './components/MealsList';
import MealDetail from './components/MealDetail';

function App() {

  const [user, setUser] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const [favoriteIdList, setFavoriteIdList] = useState(null);


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
        setUserId(uid);
        favoriteList(uid);

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

  const favoriteList = async (userId) => {
    setFavoriteIdList(await getFirestoreFavorite(userId))
    //console.log(favoriteIdList)
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
            path='/categorie/:categorieName'
            element={
              <MealList
                isLoggedIn={isLoggedIn}
                userId = {userId}
                favoriteIdList = {favoriteIdList}
              />}
          />

          <Route
            path='/categorie/:categorieName/:id'
            element={<MealDetail />} />

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
