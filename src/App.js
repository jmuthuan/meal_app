import './App.css';
import Header from './components/Header';
import MealCategories from './components/MealCategories';
import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SignUpPage from './components/SignUpPage';
import Footer from './components/Footer';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseStart from "./controllers/firebaseStart";
import UpdateUserData from './components/UpdateUserData';
import MealList from './components/MealsList';
import MealDetail from './components/MealDetail';
import getFirestoreData from './controllers/getFirestoreData'
import AddMealPage from './components/AddMealPage';
import FavoriteMeals from './components/FavoriteMeals';
import SearchResults from './components/SearchResults';
import SignInPage from './components/SignInPage';
import AboutPage from './components/AboutPage';


function App() {

  const [user, setUser] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const [favoriteIdList, setFavoriteIdList] = useState(null);
  const [mealName, setMealName] = useState('');
  const [searchBarValue, setSearchBarValue] = useState('');
  const [searchByValue, setSearchByValue] = useState('name');


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
  }

  const mealNameMealDetail = (name) => {
    setMealName(name);
  }

  const onClickSearchBar = (text, byValue) => {
    setSearchBarValue(text);
    setSearchByValue(byValue);
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
                onClickSearchBar={onClickSearchBar}
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
                  breadCrumb={2}
                  mainLogOut={logOut}
                  mainLogIn={logIn}
                  onClickSearchBar={onClickSearchBar}
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
                  onClickSearchBar={onClickSearchBar}
                />
                <MealDetail
                  isUser={false}
                  setMealName={mealNameMealDetail}
                />
              </>
            }
          />
          <Route
            path='/singIn'
            element={
              <>
                <Header
                  user={user}
                  isLoggedIn={isLoggedIn}
                  breadCrumb={4}
                  mealName={mealName}
                  mainLogOut={logOut}
                  mainLogIn={logIn}
                  onClickSearchBar={onClickSearchBar}
                />
                <SignInPage
                  isLoggedIn={isLoggedIn}
                  mainLogIn={logIn}
                />
              </>
            }
          />

          <Route
            path='/singup'
            element={<>
              <Header
                user={user}
                isLoggedIn={isLoggedIn}
                breadCrumb={13}
                mealName={mealName}
                mainLogOut={logOut}
                mainLogIn={logIn}
                onClickSearchBar={onClickSearchBar}
              />
              <SignUpPage />
            </>
            }
          />

          <Route
            path='/updateProfile/:userId'
            element={<>
              <Header
                user={user}
                isLoggedIn={isLoggedIn}
                breadCrumb={5}
                mealName={mealName}
                mainLogOut={logOut}
                mainLogIn={logIn}
                onClickSearchBar={onClickSearchBar}
              />
              <UpdateUserData
                user={user}
                app={app}
                auth={auth}
              />
            </>} />
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
                  onClickSearchBar={onClickSearchBar}
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
                  onClickSearchBar={onClickSearchBar}
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
                  onClickSearchBar={onClickSearchBar}
                />
                <MealDetail
                  isUser={true}
                  setMealName={mealNameMealDetail}
                />
              </>
            }
          />

          <Route
            path='/searchResults'
            element={
              <>
                <Header
                  user={user}
                  isLoggedIn={isLoggedIn}
                  breadCrumb={10}
                  mainLogOut={logOut}
                  mainLogIn={logIn}
                  onClickSearchBar={onClickSearchBar}
                />
                <SearchResults
                  isLoggedIn={isLoggedIn}
                  userId={userId}
                  searchBarValue={searchBarValue}
                  searchByValue={searchByValue}
                  favoriteIdList={favoriteIdList}
                />
              </>
            }
          />

          <Route
            path='/searchResults/:id'
            element={
              <>
                <Header
                  user={user}
                  isLoggedIn={isLoggedIn}
                  breadCrumb={11}
                  mealName={mealName}
                  mainLogOut={logOut}
                  mainLogIn={logIn}
                  onClickSearchBar={onClickSearchBar}
                />
                <MealDetail
                  isUser={true}
                  setMealName={mealNameMealDetail}
                />
              </>
            }
          />

          <Route
            path='/about'
            element={
              <>
                <Header
                  user={user}
                  isLoggedIn={isLoggedIn}
                  breadCrumb={12}
                  mealName={mealName}
                  mainLogOut={logOut}
                  mainLogIn={logIn}
                  onClickSearchBar={onClickSearchBar}
                />
                <AboutPage />
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
