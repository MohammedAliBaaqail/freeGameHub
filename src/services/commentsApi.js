import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const commentsApiHeaders = {
  "Content-Type": "application/json",
};

const baseUrl = "https://freegamehub-backend.onrender.com";

const createRequest = (url) => ({ url, headers: commentsApiHeaders });

export const CommentsApi = createApi({
  reducerPath: "CommentsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (gameId) => createRequest(`/game/comments/${gameId}`),
    }),
    addComment: builder.mutation({
      query: ( comment) =>({
        url: '/game/comments',
        method: "POST",
        body: comment ,

      })
        
    }),
    updateComment: builder.mutation({
      query: ( payload) =>({
        url: `/game/comments/${payload._id}`, 
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body:   payload.newComment ,
          
        }),
    }),

    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/game/comments/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
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
