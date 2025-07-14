'use client'
import { configureStore } from "@reduxjs/toolkit";
import { LoginReducer } from "./slices/loginSlice";
import createSagaMiddleware from 'redux-saga';
import { RootSaga } from "./rootSaga";
import { popupReducer } from "./slices/popupSlice";
import { signUpReducer } from "./slices/signupSlice";
import { groundsReducers } from "./slices/groundsSlice";
import { BookGroundReducer } from "./slices/bookGroundSlice";
import { StatusReducer } from "./slices/statusSlice";
import { MyBookingsReducer } from "./slices/myBookingsSlice";
import { MyGroundsReducer } from "./slices/myGroundsSlice";
import { DialogBoxReducer } from "./slices/dialogBoxSlice";
import { DeleteGroundReducer } from "./slices/deleteGroundSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer:{
        login:LoginReducer,
        popup:popupReducer,
        signup:signUpReducer,
        grounds:groundsReducers,
        bookgrounds:BookGroundReducer,
        status:StatusReducer,
        mybookings:MyBookingsReducer,
        mygrounds:MyGroundsReducer,
        dialogbox:DialogBoxReducer,
        deleteground:DeleteGroundReducer,
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            thunk:false
        }).concat(sagaMiddleware)
})

sagaMiddleware.run(RootSaga)

export type RootState =ReturnType<typeof store.getState>;
export type AppDispatch =typeof store.dispatch;