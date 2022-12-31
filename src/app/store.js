import { configureStore } from '@reduxjs/toolkit'

import { F2PGamesApi   } from '../services/F2PgamesApi'
import { giveawaysApi } from '../services/giveawaysApi'

export default configureStore({
  reducer: {
    [F2PGamesApi.reducerPath]: F2PGamesApi.reducer,
    [giveawaysApi.reducerPath]: giveawaysApi.reducer,

  },

  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(giveawaysApi.middleware,F2PGamesApi.middleware),





})