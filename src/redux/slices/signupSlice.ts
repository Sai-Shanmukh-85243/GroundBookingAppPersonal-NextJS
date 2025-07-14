import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SIGNUP_NAME } from "../types/signupTypes";
import { signupInputModel } from "@/models/signupInputModel";
import { RootState } from "../store";

const initialState:signupInputModel = {
    firstname:"",
    lastname:"",
    email:"",
    created_by:"",
    modified_by:"",
    user_location:"",
    mobile_number:"",
    date_of_birth:"",
    secondary_emailid:"",
    userCredentials:{
        username:"",
        password:"",
        role:{
            roleName:""
        }
    }
}

const signUpSlice = createSlice({
    name:SIGNUP_NAME,
    initialState,
    reducers:{
        addSignUp(state,action:PayloadAction<signupInputModel>){

        }
    }
})

export const signUpReducer = signUpSlice.reducer;
export const {addSignUp} = signUpSlice.actions;
export const signupSelector = (state:RootState)=>state.signup;