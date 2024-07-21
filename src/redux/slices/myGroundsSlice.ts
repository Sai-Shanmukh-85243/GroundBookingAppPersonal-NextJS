import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MYGROUNDS_NAME } from "../types/myGroundsTypes";
import { RootState } from "../store";
import { mygroundsOutputModel } from "@/models/mygroundsOutputModel";

const initialState:mygroundsOutputModel[]=[];

const MyGroundsSlice = createSlice({
    name:MYGROUNDS_NAME,
    initialState,
    reducers:{
        getMyGrounds(state,action:PayloadAction){
            
        },
        setMyGrounds(state,action:PayloadAction<mygroundsOutputModel[]>){
            return action.payload;
        }
    }
})

export const MyGroundsReducer = MyGroundsSlice.reducer;
export const {getMyGrounds,setMyGrounds} = MyGroundsSlice.actions;
export const MYGroundsSelector = (state:RootState)=>state.mygrounds;