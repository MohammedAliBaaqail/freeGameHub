import { createSlice } from "@reduxjs/toolkit";

export const favoriteGamesSlice = createSlice({
  name: "favoriteGames",
  initialState: {
    favorites: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setFavoriteGames: (state, action) => {
      state.favorites = action.payload;
    },
    addFavoriteGame: (state, action) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFavoriteGame: (state, action) => {
      state.favorites = state.favorites.filter(
        (game) => game !== action.payload
      );
    },
  },
});

export const { setFavoriteGames, addFavoriteGame, removeFavoriteGame } =
  favoriteGamesSlice.actions;
export const selectFavoriteGames = (state) => state.favoriteGames.favorites;
export default favoriteGamesSlice.reducer;
