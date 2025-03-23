import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// export const fetchComments = createAsyncThunk(
//   "comments/fetch",
//   async (postId) => {
//     const response = await api.get(`comments/${postId}`);
//     return response.data;
//   }
// );

export const postComment = createAsyncThunk(
  "comments/post",
  async ({ postId, text }) => {
    const response = await api.post(`comments/${postId}`, { text });
    return response.data;
  }
);
export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (commentId) => {
    await api.delete(`comments/delete/${commentId}`);
    return commentId;
  }
);

export const updateComment = createAsyncThunk(
  "comments/update",
  async ({ commentId, text }) => {
    const response = await api.put(`comments/update/${commentId}`, { text });
    return response.data;
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    commentsByPosts: {},
    loading: false,
    error: null,
  },
  reducers: {
 
    setComments: (state, action) => {
      const { postId, comments } = action.payload;
      state.commentsByPostId[postId] = comments || []; // Ensure it's always an array
      console.log(state.commentsByPostId);
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchComments.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(fetchComments.fulfilled, (state, action) => {
      //   state.comments = action.payload;
      //   state.loading = false;
      // })
      // .addCase(fetchComments.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message;
      // })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload
        );
      }).addCase(updateComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex((c) => c._id === action.payload._id);
        if(index !== -1) {
          state.comments[index] = action.payload;
        }
      });
  },
});
export const { clearComments,setComments } = commentSlice.actions;

export default commentSlice.reducer;