import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BOOKGROUND_NAME } from "../types/bookGroundTypes"
import { bookgroundInputModel } from "@/models/bookgroundInputModel"
import { RootState } from "../store"

const initialState:bookgroundInputModel = {
    username:"",
    date:"",
    startTime:"",
    endTime:"",
    groundDetails:{
        groundName:""
    },
    userDetails:{
        userCredentials:{
            username:""
        }
    }
}

const BookGroundSlice = createSlice({
    name: BOOKGROUND_NAME,
    initialState ,
    reducers:{
        addBooking(state,action:PayloadAction<bookgroundInputModel>){

        }
    }
})

export const BookGroundReducer = BookGroundSlice.reducer;
export const {addBooking} = BookGroundSlice.actions;
export const BookGroundSelector = (state:RootState) => state.bookgrounds;