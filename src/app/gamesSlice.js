


import { createSlice } from "@reduxjs/toolkit";

export const gamesSlice = createSlice({
  name: "games",
  initialState: {
    games: []
  },
  reducers: {
    setGameRating: (state, action) => {
      // const { gameId , rating } = action.payload;
      state.games = action.payload;
  
    },

    addGameRating: (state, action) => {
      // const { gameId , rating } = action.payload;
      state.games = [action.payload, ...state.games, ];
    },
    getGameRating: (state, action) => {
     

  
    },
    deleteGameRating: (state, action) => {
        
        state.games = state.games.filter((game) => game._id !== action.payload._id);
    }
  }
});

export const {  setGameRating ,addGameRating ,getGameRating ,deleteGameRating } = gamesSlice.actions;

export default gamesSlice.reducer;
