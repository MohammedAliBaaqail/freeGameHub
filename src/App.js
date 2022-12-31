import {  Routes, Route } from "react-router-dom";
import './App.scss';

import AllGames from "./pages/allF2PGamesPage/AllF2PGames";
import { F2PGamePage } from './pages/F2PGamePage/F2PGamePage';
import HomePage from './pages/homePage/HomePage'
import NavBar from "./components/navBar/NavBar";
import CategoryPage from "./pages/categoryPage/CategoryPage";
import { GiveawayPage } from "./pages/giveawayPage/GiveawayPage";
import AllGiveawaysPage from "./pages/allGiveawaysPage/AllGiveawaysPage";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/games' element={<AllGames />} />
        <Route path="game/:gameId" element={< F2PGamePage/>}/>
        <Route path="games/:category" element={< CategoryPage/>}/>
        <Route path="giveaways" element={< AllGiveawaysPage/>}/>
        <Route path="giveaway/:id" element={< GiveawayPage/>}/>
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
     
    </div>
  );
}

export default App;
