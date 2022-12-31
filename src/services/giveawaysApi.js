import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react' ;
const gamesApiHeaders = {
    'X-RapidAPI-Host': 'gamerpower.p.rapidapi.com',
    'X-RapidAPI-Key': '6203a2f5a0mshc4b84e680269b51p16fe10jsn38790fd3cb65'
}

const baseUrl = 'https://gamerpower.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: gamesApiHeaders })


export const giveawaysApi = createApi({
    reducerPath: 'giveawaysApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getGiveaways: builder.query({
            query: () => createRequest('/api/giveaways')
        }),
        getGiveawayById: builder.query({
            query: (id) => createRequest(`/api/giveaway?id=${id}`)
        })
    })
})


export const { useGetGiveawaysQuery , useGetGiveawayByIdQuery } = giveawaysApi