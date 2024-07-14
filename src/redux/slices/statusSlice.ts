import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUS_NAME } from "../types/statusTypes";
import { RootState } from "../store";

interface bookingStatusInterface  {
    bookingStatus:boolean | null,
    myBookingStatus:boolean
}

const initialState: bookingStatusInterface = {
    bookingStatus : null,
    myBookingStatus:false
}

const statusSlice = createSlice({
    name : STATUS_NAME,
    initialState,
    reducers:{
        setBookingStatus(state,action:PayloadAction<boolean | null>){
            return {...state,bookingStatus:action.payload};
        },
        setMyBookingStatus(state,action:PayloadAction<boolean>){
            return {...state,myBookingStatus:action.payload}
        }
    }
})

export const StatusReducer = statusSlice.reducer;
export const {setBookingStatus,setMyBookingStatus} = statusSlice.actions;
export const StatusSelector = (state:RootState) => state.status;