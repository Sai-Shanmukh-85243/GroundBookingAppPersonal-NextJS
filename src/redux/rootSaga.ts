
import { all, fork } from "redux-saga/effects";
import { watchCheckLogin } from "./sagas/loginSaga";
import { watchForAddSignUp } from "./sagas/signupSaga";
import { watchGetAllGrounds } from "./sagas/groundsSaga";
import { watchAddBooking } from "./sagas/bookgroundSaga";
import { watchGetMyBookings } from "./sagas/myBookingsSaga";
import { watchGetMyGrounds } from "./sagas/mygroundsSaga";
import { watchDeleteGround } from "./sagas/deletegroundSaga";

export function* RootSaga(){
    yield all(
        [
          fork(watchCheckLogin),  
          fork(watchForAddSignUp),
          fork(watchGetAllGrounds),
          fork(watchAddBooking),
          fork(watchGetMyBookings),
          fork(watchGetMyGrounds),
          fork(watchDeleteGround),
        ]
    )
}