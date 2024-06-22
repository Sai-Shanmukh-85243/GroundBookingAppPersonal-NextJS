'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const LoginSlice = createSlice({
    name:'login',
    initialState:{
        status:false,
        username:'',
        role:''
    },
    reducers:{
        getLoginData(state,action:PayloadAction){
            return state;
        }
    }
})

export const LoginReducer = LoginSlice.reducer;
export const {getLoginData} = LoginSlice.actions;
export const LoginSelector = (state:RootState) => state.login;