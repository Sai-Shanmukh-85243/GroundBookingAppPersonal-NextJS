
import { call, put, takeLatest } from "redux-saga/effects";
import { CHECK_LOGIN_IN_SAGA } from "../types/loginTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { loginInputModel } from "@/models/loginInputModel";
import { checkLoginAPI } from "../apis/loginAPI";
import { addLoginData } from "../slices/loginSlice";
import { setPopup } from "../slices/popupSlice";
import { popupModel } from "@/models/popupModel";

export function* watchCheckLogin(){
    yield takeLatest(CHECK_LOGIN_IN_SAGA,checkLoginSaga);
}

function* checkLoginSaga(action:PayloadAction<loginInputModel>): Generator<any>{
    let result:any;
    result = yield call(checkLoginAPI,action.payload);
    if(result.data){
        yield put(addLoginData(result.data));
        let popup:popupModel = {
            show:true,
            message:'Logged in successfully',
            type:'success'
        }
        yield put(setPopup(popup));
    }
    else{
        yield put(setPopup(result))
    }
}