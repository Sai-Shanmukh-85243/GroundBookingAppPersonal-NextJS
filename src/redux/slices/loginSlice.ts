
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { loginInputModel } from "@/models/loginInputModel";
import { LOGIN_SLICE_NAME } from "../types/loginTypes";
import { loginOutputModel } from "@/models/loginOutputModel";

const LoginSlice = createSlice({
    name:LOGIN_SLICE_NAME,
    initialState:{
        status:false,
        token:'',
        username:'',
        role:''
    },
    reducers:{
        getLoginData(state,action:PayloadAction){
            return state;
        },
        checkLoginData(state,action:PayloadAction<loginInputModel>){

        },
        addLoginData(state,action:PayloadAction<loginOutputModel>){
            return {
                status:true,
                token:action.payload.token,
                username:action.payload.username,
                role:action.payload.role
            }
        },
        removeLoginData(state,action:PayloadAction){
            return {
                status:false,
                token:'',
                username:'',
                role:''
            }
        }
    }
})

export const LoginReducer = LoginSlice.reducer;
export const {getLoginData,checkLoginData,addLoginData,removeLoginData} = LoginSlice.actions;
export const LoginSelector = (state:RootState) => state.login;