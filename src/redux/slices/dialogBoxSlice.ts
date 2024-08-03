import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { dialogBoxName } from "../types/dialogboxTypes";
import { dialogboxButtonsArray, dialogboxState, dialogPayload } from "@/models/dialogboxInputModel";

const initialState : dialogboxState={
    show:false,
    message:'',
    buttons:[],
    height:'',
    width:'',
}

const DialogBoxSlice = createSlice({
    name:dialogBoxName,
    initialState:initialState,
    reducers:{
        showDialogBox(state,action:PayloadAction){
            return {...state,show:true};
        },
        hideDialogBox(state,action:PayloadAction){
            return {...state,show:false};
        },
        setDialogContect(state,action:PayloadAction<dialogPayload>){
            return {
                ...state,
                message:action.payload.message,
                buttons:action.payload.buttons,
                height:action.payload.height?action.payload.height:'',
                width:action.payload.width?action.payload.width:'',
            };
        },
        removeDialogContent(state,action:PayloadAction){
            return {
                ...state,
                message:'',
                buttons:[],
                height:'',
                width:'',
            }
        }
    }
});

export const DialogBoxReducer = DialogBoxSlice.reducer;
export const {showDialogBox,hideDialogBox,setDialogContect,removeDialogContent} = DialogBoxSlice.actions;
export const DialogBoxSelector = (state:RootState) => state.dialogbox;