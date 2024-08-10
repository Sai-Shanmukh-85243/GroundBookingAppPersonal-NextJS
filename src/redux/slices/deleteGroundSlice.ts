import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DELETE_GROUND_NAME } from "../types/deleteGroundTypes";
import { RootState } from "../store";

const DeleteGroundSlice = createSlice({
    name: DELETE_GROUND_NAME,
    initialState: {status: null} as {status:boolean | null},
    reducers: {
        deleteGround(state, action: PayloadAction<string>) {

        },
        setDeleteGroundStatus(state,action:PayloadAction<boolean | null>){
            return {...state,status:action.payload}
        }
    }
})

export const DeleteGroundReducer = DeleteGroundSlice.reducer;
export const { deleteGround,setDeleteGroundStatus } = DeleteGroundSlice.actions;
export const DeleteGroundSelector = (state: RootState) => state.deleteground;