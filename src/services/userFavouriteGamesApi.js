import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react' ;
// const gamesApiHeaders = {
//     "Content-Type": "application/json",

// }

const baseUrl = 'https://free-game-hub-backend.vercel.app'

// const createRequest = (url) => ({ url, headers: gamesApiHeaders })


export const UserFavouriteGamesApi = createApi({
    reducerPath: 'UserFavouriteGamesApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({

        getFavouriteGames: builder.query({
            query: (user) => ({
              url: `/user/getFavouriteGames/${user?.username}`,
              headers: {
                
                'Authorization': `Bearer ${user?.token}`,
              },
            }),
          }),
        addFavouriteGame: builder.mutation({
            query: (favouriteGame) => ({
                url: '/user/addFavouriteGame',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${favouriteGame.token}`
                    },
                method: 'POST',
                body: favouriteGame
            })
        }),

        removeFavouriteGame: builder.mutation({
            query: (favouriteGame) => ({
                url: '/user/removeFavouriteGame',
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${favouriteGame.token}`
                  },
                
                body: favouriteGame


    })
})
})
})


export const {
    useAddFavouriteGameMutation,
    useRemoveFavouriteGameMutation,
    useGetFavouriteGamesQuery
} = UserFavouriteGamesApi

