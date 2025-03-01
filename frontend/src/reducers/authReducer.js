import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk("auth/login",async(formData, {rejectedWithValue}) => {
    try {
        const response = await axios.post("http://localhost:3000/api/users/login",formData);
        localStorage.setItem("token",response.data.token);
        return response.data;
    }catch(error) {
        return rejectedWithValue(error.response.data);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: localStorage.getItem("token") || null,
        isLoading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(login.fulfilled,(state,action) => {
            state.isLoading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
        })
        .addCase(login.rejected,(state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        })  
    }
});
export const {logout} = authSlice.actions;
export default authSlice.reducer;