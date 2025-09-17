import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import chatReducer from './chatSlice'
// import historyReducer from './historySlice'


export const store = configureStore({
    reducer:{
        auth:authReducer,
        chat:chatReducer,
        // history:historyReducer
    }
})
