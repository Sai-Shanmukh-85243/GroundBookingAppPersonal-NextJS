import { signupInputModel } from "@/models/signupInputModel";
import { PayloadAction } from "@reduxjs/toolkit";
import { signupAPI } from "../apis/signupAPI";
import { setPopup } from "../slices/popupSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import { popupModel } from "@/models/popupModel";
import { LISTEN_ADD_SIGNUP } from "../types/signupTypes";

function* addSignUpSaga(action:PayloadAction<signupInputModel>):Generator{
    let data:signupInputModel = action.payload;
    let result:popupModel;
    result = (yield call(signupAPI,data)) as popupModel;
    yield put(setPopup(result));
}

export function* watchForAddSignUp(){
    yield takeLatest(LISTEN_ADD_SIGNUP,addSignUpSaga);
}