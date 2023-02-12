


import { createSlice } from "@reduxjs/toolkit";

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    cmnt: []
  },
  reducers: {
    setComments: (state, action) => {
        state.cmnt = action.payload;
    },

    addComments: (state, action) => {
        state.cmnt = [action.payload, ...state.cmnt, ];
    },
    patchComment: (state, action) => {
        const { _id, text } = action.payload;
        state.cmnt =  state.cmnt.map((comment) => comment._id === _id ? { ...comment, text } : comment);
  
    },
    removeComment: (state, action) => {
      const { _id } = action.payload;
        state.cmnt = state.cmnt.filter((comment) => comment._id !== _id);
    },
  }
});

export const {  addComments ,setComments ,patchComment ,removeComment } = commentsSlice.actions;

export default commentsSlice.reducer;
