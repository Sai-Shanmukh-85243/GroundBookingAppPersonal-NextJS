'use client';
import { popupModel } from "@/models/popupModel";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { popupSelector, setPopup } from "@/redux/slices/popupSlice";
import { useEffect } from "react";

const Popup = () => {
    const popupData = useAppSelector(popupSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (popupData.show) {
            setTimeout(() => {
                const hidePopupData: popupModel = {
                    show: false,
                    message: '',
                    type: 'none'
                }
                dispatch(setPopup(hidePopupData))
            }, 2000)
        }
    }, [popupData])

    return (
        <div className={popupData.show?'flex':'hidden'+"w-full"}>
            <span className={`
                flex justify-center items-center py-1 rounded-md
                text-sm text-white w-full font-serif
                ${popupData.type === 'success' && 'bg-green-500'}
                ${popupData.type === 'danger' && 'bg-red-500'}
                ${popupData.type === 'warn' && 'bg-yellow-500'}
                `}>
                {popupData.message}
            </span>
        </div>
    )
}

export default Popup;