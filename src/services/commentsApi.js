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
      query: (id, text) =>
        createRequest(`/game/comments/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ text: text }),
          
        }),
    }),

    deleteComment: builder.mutation({
      query: (id) =>
        createRequest(`/game/comments/${id}`, {
          method: "DELETE",
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
