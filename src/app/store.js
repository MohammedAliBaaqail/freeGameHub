import { configureStore } from "@reduxjs/toolkit";

import { F2PGamesApi } from "../services/F2PgamesApi";
import { giveawaysApi } from "../services/giveawaysApi";
import commentsReducer from "./commentsSlice";
import gamesReducer from "./gamesSlice";
import userReducer from "./userSlice";


export default configureStore({
  reducer: {
    [F2PGamesApi.reducerPath]: F2PGamesApi.reducer,
    [giveawaysApi.reducerPath]: giveawaysApi.reducer,
    comments: commentsReducer,
    games: gamesReducer,
    user: userReducer,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      giveawaysApi.middleware,
      F2PGamesApi.middleware
    ),
});
