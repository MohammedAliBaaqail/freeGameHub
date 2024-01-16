import { Routes, Route, useLocation ,Navigate } from "react-router-dom";
import "./App.scss";

import AllGames from "./pages/allF2PGamesPage/AllF2PGames";
import { F2PGamePage } from "./pages/F2PGamePage/F2PGamePage";
import HomePage from "./pages/homePage/HomePage";
import NavBar from "./components/navBar/NavBar";
import  { CategoriesPage } from "./pages/categoriesPage/CategoriesPage";
import  { CategoryPage } from "./pages/categoryPage/CategoryPage";
import { GiveawayPage } from "./pages/giveawayPage/GiveawayPage";
import AllGiveawaysPage from "./pages/allGiveawaysPage/AllGiveawaysPage";
import Signup from "./pages/signup/Signup";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import { UserFavouriteGames } from "./pages/userFavouriteGames/UserFavouriteGames";
import NoPage from "./pages/404/404";
import EmailVerification from "./pages/emailVerificationPage/EmailVerificationPage";


function App() {
  const {user} = useSelector((state) => state.user);
  const location = useLocation();

  return (
    <div className="App">
      <NavBar />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/"               element={<HomePage />} />
          <Route path="/games"          element={<AllGames />} />
          <Route path="game/:gameId"    element={<F2PGamePage />} />
          <Route path="category/:category" element={<CategoryPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="giveaways"       element={<AllGiveawaysPage />} />
          <Route path="giveaway/:id"    element={<GiveawayPage />} />
          <Route path="/unverified"    element={<GiveawayPage />} />
          <Route path="/verify/:token"    element={<EmailVerification />} />
          <Route path="userfavgames"    element={user ? <UserFavouriteGames/> : <Navigate to="/login" />}/>
          <Route path="/signup"         element={!user ? <Signup /> : <Navigate to="/" />}/>
          <Route path="/login"          element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route path="*" element={<NoPage/>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
