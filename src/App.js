import {  Routes, Route } from "react-router-dom";
import './App.css';

import AllGames from "./pages/allGames/AllGames";
import { GamePage } from './pages/gamePage/GamePage';
import Home from './pages/home/Home'
import NavBar from "./components/navBar/NavBar";
import CategoryPage from "./pages/categoryPage/CategoryPage";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/games' element={<AllGames />} />
        <Route path="game/:gameId" element={< GamePage/>}/>
        <Route path="games/:category" element={< CategoryPage/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
