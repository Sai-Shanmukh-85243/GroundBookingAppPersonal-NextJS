import { put, takeLatest } from "redux-saga/effects";
import { WATCH_GETMYBOOKINGS } from "../types/myBookingsTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { getMyBookingsAPI } from "../apis/mybookingsAPI";
import { setMyBookings } from "../slices/myBookingsSlice";
import { setPopup } from "../slices/popupSlice";
import { mybookingOutputModel } from "@/models/mybookingsOutputModel";

function* getMyBookingsSaga(action:PayloadAction<{username:string,token:string}>){
    var result:{status:boolean,data?:Array<object>,message?:string}={status:false};
    result = (yield getMyBookingsAPI(action.payload.token,action.payload.username)) as {status:boolean,data?:mybookingOutputModel[],message?:string};
    if(result.status){
        yield put(setMyBookings(result.data as mybookingOutputModel[]))
    } 
    else{
        yield put(setPopup({show:true,message:result.message?result.message:"",type:'danger'}))
    }
}

export function* watchGetMyBookings(){
    yield takeLatest(WATCH_GETMYBOOKINGS,getMyBookingsSaga);
}