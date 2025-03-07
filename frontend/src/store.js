import {configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer'
import postReducer from './reducers/postReducer'
import profileReducer from './reducers/profileReducer'
import commentReducer from './reducers/commentReducer'
const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        profile: profileReducer,
        comments: commentReducer
    }
})

export default store;