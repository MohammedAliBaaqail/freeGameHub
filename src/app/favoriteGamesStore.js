
import { configureStore } from "@reduxjs/toolkit";
import favoriteGamesReducer from "./favoriteGamesSlice";


export default configureStore({
  reducer: {
    favoriteGames: favoriteGamesReducer,
 
  },

});

