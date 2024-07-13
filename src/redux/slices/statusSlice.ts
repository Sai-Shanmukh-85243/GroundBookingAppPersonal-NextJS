import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUS_NAME } from "../types/statusTypes";
import { RootState } from "../store";

interface bookingStatusInterface  {
    bookingStatus:boolean | null
}

const initialState: bookingStatusInterface = {
    bookingStatus : null
}

const statusSlice = createSlice({
    name : STATUS_NAME,
    initialState,
    reducers:{
        setBookingStatus(state,action:PayloadAction<boolean | null>){
            return {...initialState,bookingStatus:action.payload};
        }
    }
})

export const StatusReducer = statusSlice.reducer;
export const {setBookingStatus} = statusSlice.actions;
export const StatusSelector = (state:RootState) => state.status;