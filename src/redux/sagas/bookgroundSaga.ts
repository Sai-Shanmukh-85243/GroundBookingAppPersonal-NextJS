import { put, select, takeLatest } from "redux-saga/effects";
import { BOOKGROUND_ADDBOOKING } from "../types/bookGroundTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { bookgroundInputModel } from "@/models/bookgroundInputModel";
import { RootState } from "../store";
import { addBookingAPI } from "../apis/bookgroundAPI";
import { setPopup } from "../slices/popupSlice";
import { setBookingStatus } from "../slices/statusSlice";

function* addBookingSaga(action:PayloadAction<bookgroundInputModel>){
    //var getToken = (state:RootState)=>state.login.token
    var token = (yield select((state:RootState)=>state.login.token)) as string
    var result = (yield addBookingAPI(action.payload,token)) as {status:boolean,message?:string};
    if(result.status){
        yield put(setPopup({show:true,message:"Booking Added Successfully",type:'success'}));
        yield put(setBookingStatus(true));
    }
    else if(!result.status){
        yield put(setPopup({show:true,message:result.message?result.message:"Operation Failed",type:'danger'}));
        yield put(setBookingStatus(false));
    }
    else{
        yield put(setPopup({show:true,message:result.message?result.message:"Internal Server Error",type:'danger'}))
    }
}

export function* watchAddBooking(){
    yield takeLatest(BOOKGROUND_ADDBOOKING,addBookingSaga);
}