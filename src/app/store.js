import { configureStore } from "@reduxjs/toolkit";

import { F2PGamesApi } from "../services/F2PgamesApi";
import { giveawaysApi } from "../services/giveawaysApi";
import { CommentsApi } from "../services/commentsApi";
import { UserFavouriteGamesApi } from "../services/userFavouriteGamesApi";
import commentsReducer from "./commentsSlice";
import favoriteGamesReducer from "./favoriteGamesSlice";
import gamesReducer from "./gamesSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    [F2PGamesApi.reducerPath]: F2PGamesApi.reducer,
    [giveawaysApi.reducerPath]: giveawaysApi.reducer,
    [CommentsApi.reducerPath]: CommentsApi.reducer,
    [UserFavouriteGamesApi.reducerPath]: UserFavouriteGamesApi.reducer,
    games: gamesReducer,
    user: userReducer,
    comments: commentsReducer,
    favoriteGames: favoriteGamesReducer,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      giveawaysApi.middleware,
      F2PGamesApi.middleware,
      CommentsApi.middleware,
      UserFavouriteGamesApi.middleware
    ),
});
