import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MYBOOKINGS_NAME } from "../types/myBookingsTypes";
import { RootState } from "../store";
import { mybookingOutputModel } from "@/models/mybookingsOutputModel";

const initialState:mybookingOutputModel[] = []

const MyBookingsSlice = createSlice({
    name:MYBOOKINGS_NAME,
    initialState,
    reducers:{
        getMyBookings(state,action:PayloadAction<{username:string,token:string}>){

        },
        setMyBookings(state,action:PayloadAction<mybookingOutputModel[]>){
            return action.payload
        }
    }
})

export const MyBookingsReducer = MyBookingsSlice.reducer;
export const {getMyBookings,setMyBookings} = MyBookingsSlice.actions;
export const MyBookingSelector = (state:RootState) => state.mybookings;