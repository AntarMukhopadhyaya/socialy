import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`users/profile/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching profile data."
      );
    }
  }
);

export const toggleFollow = createAsyncThunk(
  "profile/toggleFollow",
  async (id, { getState, rejectWithValue }) => {
    try {
      const response = await api.post(`users/follow/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error toggling follow.");
    }
  }
);
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetProfile: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleFollow.fulfilled, (state,action) => {
        if (state.data) {
          state.data.isFollowing = !state.data.isFollowing;
          state.data.followers = state.data.isFollowing
            ? [...state.data.followers, state.data._id]
            : state.data.followers.filter(
                (userId) => userId !== state.data._id
              );
        }
      });
  },
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
