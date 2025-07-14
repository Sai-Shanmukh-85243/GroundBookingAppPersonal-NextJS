import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { POPUP_NAME } from "../types/popupTypes";
import { popupModel } from "@/models/popupModel";
import { RootState } from "../store";

const initialState:popupModel = {
    show:false,
    message:'',
    type:'none'
}

const popupSlice = createSlice({
    name :POPUP_NAME,
    initialState,
    reducers:{
        setPopup(state,action:PayloadAction<popupModel>){
            return action.payload;
        }
    }
})

export const popupReducer = popupSlice.reducer;
export const {setPopup} = popupSlice.actions;
export const popupSelector = (state:RootState) => state.popup;