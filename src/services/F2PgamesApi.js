import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react' ;

const gamesApiHeaders = {
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
    'X-RapidAPI-Key': '6203a2f5a0mshc4b84e680269b51p16fe10jsn38790fd3cb65'
}

const baseUrl = 'https://free-to-play-games-database.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: gamesApiHeaders })


export const F2PGamesApi = createApi({
    reducerPath: 'F2PGamesApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getGames: builder.query({
            query: () => createRequest('/api/games')
        }),
        getGame: builder.query({
            query: (id) => createRequest(`/api/game?id=${id}`)
        }),
        getGamesByCategory: builder.query({
            query: (category) => createRequest(`/api/games?category=${category}`)
        }),
        getGamesBySortKey: builder.query({
            query: (sortKey) => createRequest(`/api/games?sort-by=${sortKey}`)
        })
    })
})




export const { useGetGamesQuery , useGetGameQuery , useGetGamesByCategoryQuery , useGetGamesBySortKeyQuery } = F2PGamesApi
