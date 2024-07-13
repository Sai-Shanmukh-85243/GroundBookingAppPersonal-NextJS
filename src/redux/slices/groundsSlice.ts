import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GROUNDS_SLICE_NAME } from "../types/groundsTypes";
import { RootState } from "../store";
import { allGroundsOutputModel } from "@/models/allgroundsOutputModel";

const initialState:Array<allGroundsOutputModel> = [];

const groundsSlice = createSlice({
    name: GROUNDS_SLICE_NAME,
    initialState,
    reducers:{
        getAllGrounds(state,action:PayloadAction<string>){

        },
        setAllGrounds(state,action:PayloadAction<Array<allGroundsOutputModel>>){
            return action.payload;
        }
    }
});

export const groundsReducers = groundsSlice.reducer;
export const {getAllGrounds,setAllGrounds} = groundsSlice.actions;
export const groundsSelector = (state:RootState) => state.grounds;
