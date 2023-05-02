import './App.css';
import Header from './components/Header';
import MealCategories from './components/MealCategories';
import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SingUpPage from './components/SingUpPage';
import Footer from './components/Footer';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseStart from "./components/firebaseStart";
import UpdateUserData from './components/UpdateUserData';
import MealList from './components/MealsList';
import MealDetail from './components/MealDetail';
import getFirestoreData from './controllers/getFirestoreData'
import AddMealPage from './components/AddMealPage';
import FavoriteMeals from './components/FavoriteMeals';

function App() {

  const [user, setUser] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const [favoriteIdList, setFavoriteIdList] = useState(null);
  const [mealName, setMealName] = useState('Testing');


  const app = firebaseStart();
  const auth = getAuth(app);

  useEffect(() => {
    logIn();
  }, [])

  const logIn = () => {
    /* console.log("testing firebase auth"); */
    //const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        //console.log(user);

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
    setFavoriteIdList(await getFirestoreData('favorites', userId))
    //console.log(favoriteIdList)
  }

  const mealNameMealDetail = (name) =>{
    setMealName(name);
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
                breadCrumb={1}
                mainLogOut={logOut}
                mainLogIn={logIn}
              />
              <MealCategories
                user={user}
                isLoggedIn={isLoggedIn}
              />
            </>}
          />

          <Route
            path='/categorie/:categorieName'
            element={
              <>
                <Header
                  user={user}
                  isLoggedIn={isLoggedIn}
                  breadCrumb = {2}
                  mainLogOut={logOut}
                  mainLogIn={logIn}
                />
                <MealList
                  isLoggedIn={isLoggedIn}
                  userId={userId}
                  favoriteIdList={favoriteIdList}
                  mainLogIn={logIn}
                  favoriteList={favoriteList}
                />
              </>
            }
          />

          <Route
            path='/categorie/:categorieName/:id'
            element={
              <>
                <Header
                  user={user}
                  isLoggedIn={isLoggedIn}
                  breadCrumb={3}
                  mealName={mealName}
                  mainLogOut={logOut}
                  mainLogIn={logIn}
                />
                <MealDetail
                  isUser={false}
                  setMealName={mealNameMealDetail}
                />
              </>
            }
          />

          <Route
            path='/singup'
            element={<SingUpPage />}

          />
          <Route
            path='/updateProfile/:userId'
            element={
              <UpdateUserData
                user={user}
                app={app}
                auth={auth}
              />} />
          <Route
            path='/addMeal/:userId'
            element={
              <>
                <Header
                  user={user}
                  isLoggedIn={isLoggedIn}
                  breadCrumb={6}
                  mainLogOut={logOut}
                  mainLogIn={logIn}
                />
                <AddMealPage />
              </>

            }
          />

          <Route
            path='/favoriteUserMeals/:userId'
            element={
              <>
                <Header
                  user={user}
                  isLoggedIn={isLoggedIn}
                  breadCrumb={7}
                  mainLogOut={logOut}
                  mainLogIn={logIn}
                />
              <FavoriteMeals
                isLoggedIn={isLoggedIn}
              />
              </>
            }
          />

          <Route
            path='/favoriteUserMeals/:userId/:id'
            element={
              <>
                <Header
                  user={user}
                  isLoggedIn={isLoggedIn}
                  breadCrumb={8}
                  mealName={mealName}
                  mainLogOut={logOut}
                  mainLogIn={logIn}
                />
              <MealDetail
                isUser={true}
                setMealName={mealNameMealDetail}
              />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
