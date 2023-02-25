import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react' ;
const gamesApiHeaders = {
    "Content-Type": "application/json",

}

const baseUrl = 'https://freegamehub-backend.onrender.com'

const createRequest = (url) => ({ url, headers: gamesApiHeaders })


export const UserFavouriteGamesApi = createApi({
    reducerPath: 'UserFavouriteGamesApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({

        getFavoriteGames: builder.query({
            query: (user) => createRequest(`/user/getFavouriteGames/${user.username}`),
            
          }),
        addFavouriteGame: builder.mutation({
            query: (favouriteGame) => ({
                url: '/user/addFavouriteGame',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${newComment.token}`
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
                    // 'Authorization': `Bearer ${newComment.token}`
                  },
                
                body: favouriteGame


    })
})
})
})


export const {
    useAddFavouriteGameMutation,
    useRemoveFavouriteGameMutation,
    useGetFavoriteGamesQuery
} = UserFavouriteGamesApi

