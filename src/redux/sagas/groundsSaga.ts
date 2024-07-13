import { PayloadAction } from "@reduxjs/toolkit";
import { getAllGroundsApi } from "../apis/groundsAPI";
import { put, takeLatest } from "redux-saga/effects";
import { setAllGrounds } from "../slices/groundsSlice";
import { LISTEN_GET_ALLGROUNDS } from "../types/groundsTypes";

function* getAllGroundsSaga(action:PayloadAction<string>):Generator{
    let token = action.payload;
    let result:any = yield getAllGroundsApi(token);
    if(result.show){
        yield put(result);
    }
    else{
        yield put(setAllGrounds(result));
    }
}

export function* watchGetAllGrounds(){
    yield takeLatest(LISTEN_GET_ALLGROUNDS,getAllGroundsSaga);
}