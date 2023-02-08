import { configureStore } from "@reduxjs/toolkit";

import { F2PGamesApi } from "../services/F2PgamesApi";
import { giveawaysApi } from "../services/giveawaysApi";
import { CommentsApi } from "../services/commentsApi";
import commentsReducer from "./commentsSlice";
import gamesReducer from "./gamesSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    [F2PGamesApi.reducerPath]: F2PGamesApi.reducer,
    [giveawaysApi.reducerPath]: giveawaysApi.reducer,
    [CommentsApi.reducerPath]: CommentsApi.reducer,
    games: gamesReducer,
    user: userReducer,
    comments: commentsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      giveawaysApi.middleware,
      F2PGamesApi.middleware,
      CommentsApi.middleware
    ),
});
