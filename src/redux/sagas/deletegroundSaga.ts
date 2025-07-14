import { put, select, takeLatest } from "redux-saga/effects";
import { WATCH_DELETE_GROUND } from "../types/deleteGroundTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { deleteGroundAPI } from "../apis/deletegroundAPI";
import { RootState } from "../store";
import { setPopup } from "../slices/popupSlice";
import { getMyGrounds } from "../slices/myGroundsSlice";
import { setDeleteGroundStatus } from "../slices/deleteGroundSlice";

function* deleteGroundSaga(action: PayloadAction<string>) {
    var groundName = action.payload;
    var token = (yield select((state: RootState) =>  state.login.token )) as string;
    var result = (yield deleteGroundAPI(groundName, token)) as { success: boolean, message: string };

    yield put(setDeleteGroundStatus(result.success));
    yield put(setPopup({ show: true, message: result.message, type: result.success ? 'success' : 'danger' }));
    if(result.success){
        yield put(getMyGrounds());
    }

}

export function* watchDeleteGround() {
    yield takeLatest(WATCH_DELETE_GROUND, deleteGroundSaga);
}