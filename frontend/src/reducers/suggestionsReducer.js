import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import _ from "lodash";
import api from "../api";

export const fetchSuggestions = createAsyncThunk(
  "suggestions/fetchSuggestion",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/suggestions");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState: {
    suggestions: [],
    loading: false,
    error: null,
  },
  reducers: {
    removeSuggestion: (state, action) => {
      state.suggestions = state.suggestions.filter(
        (user) => user.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { removeSuggestion } = suggestionsSlice.actions;
export default suggestionsSlice.reducer;