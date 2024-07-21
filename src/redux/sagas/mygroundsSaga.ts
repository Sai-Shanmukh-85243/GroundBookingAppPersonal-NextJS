import { put, select, takeLatest } from "redux-saga/effects";
import { WATCH_GETMYGROUNDS } from "../types/myGroundsTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { getMyGroundsAPI } from "../apis/mygroundsAPI";
import { RootState } from "../store";
import { loginOutputModel } from "@/models/loginOutputModel";
import { setPopup } from "../slices/popupSlice";
import { popupModel } from "@/models/popupModel";
import { setMyGrounds } from "../slices/myGroundsSlice";
import { mygroundsOutputModel } from "@/models/mygroundsOutputModel";

function* GetMyGroundsSaga(action:PayloadAction){
    var loginData = (yield select((state:RootState)=>state.login)) as loginOutputModel;
    var response = (yield getMyGroundsAPI(loginData.username,loginData.token)) as {show?:boolean,data?:mygroundsOutputModel[],message?:string,type?:string};
    if(response.show){
        let popupdata:popupModel = response as {show:boolean,message:string,type:'success' | 'danger' | 'warn' | 'none'};
        yield put(setPopup(popupdata));
    }
    else{
        let data = response.data as mygroundsOutputModel[];
        yield put(setMyGrounds(data));
    }
}

export function* watchGetMyGrounds(){
    yield takeLatest(WATCH_GETMYGROUNDS,GetMyGroundsSaga);
}