'use client'
import { configureStore } from "@reduxjs/toolkit";
import { LoginReducer } from "./slices/loginSlice";

export const store = configureStore({
    reducer:{
        login:LoginReducer,
    }
})

export type RootState =ReturnType<typeof store.getState>;
export type AppDispatch =typeof store.dispatch;