import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const commentsApiHeaders = {
  "Content-Type": "application/json",
};

const baseUrl = "https://free-game-hub-backend.vercel.app";

const createRequest = (url) => ({ url, headers: commentsApiHeaders });

export const CommentsApi = createApi({
  reducerPath: "CommentsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (gameId) => createRequest(`/game/comments/${gameId}`),
    }),
    addComment: builder.mutation({
      query: ( newComment) =>({
        url: '/game/comments',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${newComment.token}`
        },
        method: "POST",
        body: newComment.comment ,

      })
        
    }),
    updateComment: builder.mutation({
      query: ( payload) =>({
        url: `/game/comments/${payload._id}`, 
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${payload.token}`
          },
          body:   payload.newComment ,
          
        }),
    }),

    deleteComment: builder.mutation({
      query: (payload) => ({
        url: `/game/comments/${payload._id}`,
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${payload.token}`
        },

        
    }),
  }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = CommentsApi;
