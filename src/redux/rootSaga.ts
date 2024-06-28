
import { all, fork } from "redux-saga/effects";
import { watchCheckLogin } from "./sagas/loginSaga";
import { watchForAddSignUp } from "./sagas/signupSaga";

export function* RootSaga(){
    yield all(
        [
          fork(watchCheckLogin),  
          fork(watchForAddSignUp)
        ]
    )
}