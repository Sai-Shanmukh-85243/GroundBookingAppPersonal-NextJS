'use client'
import { allGroundsOutputModel } from "@/models/allgroundsOutputModel";
import { bookgroundInputModel } from "@/models/bookgroundInputModel";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addBooking } from "@/redux/slices/bookGroundSlice";
import { groundsSelector } from "@/redux/slices/groundsSlice";
import { LoginSelector } from "@/redux/slices/loginSlice";
import { setPopup } from "@/redux/slices/popupSlice";
import { setBookingStatus, StatusSelector } from "@/redux/slices/statusSlice";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const BookGround = ({ params }: { params: any }) => {
    const groundName = decodeURIComponent(params.groundName);
    const router = useRouter();
    const loginDetails = useAppSelector(LoginSelector);
    const allGrounds = useAppSelector(groundsSelector);
    const bookingStatus = useAppSelector(StatusSelector).bookingStatus;
    const [selectedGround, setSelectedGround] = useState<allGroundsOutputModel>({ groundName: '', groundLocation: '', price: 0, addedBy: '', description: '', image: '' });
    const [bookedFor, SetBookedFor] = useState("");
    const [bookedFrom, setBookedFrom] = useState("");
    const [bookedTo, setBookedTo] = useState("");
    var bookedForValues = ["","09:00", "09:30","10:00","10:30","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30"];
    var bookedToValues = ["", "09:30","10:00","10:30","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00"];

    const dispatch = useAppDispatch();

    useEffect(() => {
        !loginDetails.status && router.replace('/grounds');
    }, [loginDetails])

    useEffect(() => {
        allGrounds.forEach((ground) => {
            if (ground.groundName === groundName) {
                setSelectedGround(ground)
            }
        })
    }, []);

    useEffect(() => {
        if (bookingStatus) {
            dispatch(setBookingStatus(null));
            router.replace('/mybookings');
        }
        if (!bookingStatus) {
            dispatch(setBookingStatus(null));
        }
    }, [bookingStatus]);

    function BookedFor(e: React.ChangeEvent<HTMLInputElement>) {
        let bookedDate = e.target.value;
        let currentData = new Date();
        if (bookedDate.split("T")[0] < currentData.toISOString().split("T")[0]) {
            dispatch(setPopup({ message: 'Please select a valid date', show: true, type: 'danger' }));
            SetBookedFor("");
        }
        else {
            SetBookedFor(bookedDate.split("T")[0]);
        }
    }

    function BookedFrom(e: React.ChangeEvent<HTMLSelectElement>) {
        let startTime = e.target.value;

        if (bookedFor === "" || bookedFor === null || bookedFor === undefined) {
            dispatch(setPopup({ message: "Please select a date(booked for) first", show: true, type: 'danger' }))
        }
        else if (startTime < "09:00" || startTime > "20:30") {
            dispatch(setPopup({ message: "The valid start time ranges from 09:00 A.M to 20:30 P.M", show: true, type: 'danger' }))
            setBookedFrom("");
        }
        else if (bookedFor === new Date().toISOString().split("T")[0] && startTime < new Date().toString().split(" ")[4]) {
            dispatch(setPopup({ message: "Please select a valid time", show: true, type: 'danger' }));
        }
        else {
            setBookedFrom(startTime)
        }
    }

    function BookedTo(e: React.ChangeEvent<HTMLSelectElement>) {
        let endTime = e.target.value;
        if (bookedFrom === "" || bookedFrom === null || bookedFrom === undefined) {
            dispatch(setPopup({ message: "Please select a start time(Booked From) first", show: true, type: 'danger' }))
            setBookedTo("");
        }
        else if (bookedFrom >= endTime) {
            dispatch(setPopup({ message: "End Time(booked to) should be after Start Time(booked from)", show: true, type: 'danger' }))
            setBookedTo("");
        }
        else if (endTime > "21:00" || endTime < "09:30") {
            dispatch(setPopup({ message: "The valid end time ranges from 09:30 A.M to 21:00 P.M", show: true, type: 'danger' }))
            setBookedTo("");
        }
        else {
            setBookedTo(endTime)
        }
    }

    function hideInValidTimeForTodayDate(value:string){
        if(bookedFor === new Date().toISOString().split("T")[0] && value < new Date().toString().split(" ")[4]){
            return true
        }
        return false;
    }

    function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(setBookingStatus(null));
        var data: bookgroundInputModel = {
            username: loginDetails.username,
            date: bookedFor,
            startTime: bookedFrom,
            endTime: bookedTo,
            groundDetails: {
                groundName: groundName
            },
            userDetails: {
                userCredentials: {
                    username: loginDetails.username
                }
            }
        }
        dispatch(addBooking(data));
    }

    function getTodaysDate() {
        var dateTime = new Date();
        var year = dateTime.getFullYear();
        var month = ("0" + (dateTime.getMonth() + 1)).slice(-2);
        var date = dateTime.getDate();
        var send = year + "-" + month + "-" + date;
        return send;
    }

    function onFocusOfBookFrom(){
        if(bookedFor === "" || bookedFor === null || bookedFor === undefined){
            dispatch(setPopup({ message: "Please select a date(booked for) first", show: true, type: 'danger' }))
        }
    }

    function onFocusOfBookTo(){
        if(bookedFrom === "" || bookedFrom === null || bookedFrom === undefined){
            dispatch(setPopup({ message: "Please select a start time(book from) first", show: true, type: 'danger' }))
        }
    }



    return (
        <div className="h-full w-full">
            <form className="h-full w-full flex justify-center items-center flex-wrap" onSubmit={handleSubmit}>
                <div className="p-5 flex flex-col gap-8 border-2 border-black bookGroundForm">
                    <div className="grid gap-5 items-center max-sm:my-5 sm:grid-rows-5 sm:grid-flow-col">
                        <label className="flex flex-col gap-1">
                            <span className="self-center">Ground Name:&nbsp;</span>
                            <input className="px-3 py-1" value={selectedGround?.groundName} disabled></input>
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="self-center">Ground Location:&nbsp;</span>
                            <input className="px-3 py-1" value={selectedGround?.groundLocation} disabled></input>
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="self-center">Ground Price<span>(per hour)</span>:&nbsp;</span>
                            <input className="px-3 py-1" value={selectedGround?.price} disabled></input>
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="self-center">Ground Owner:&nbsp;</span>
                            <input className="px-3 py-1" value={selectedGround?.addedBy} disabled></input>
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="self-center">Ground Description:&nbsp;</span>
                            <input className="px-3 py-1" value={selectedGround?.description} disabled></input>
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="self-center">Booked By:&nbsp;</span>
                            <input className="px-3 py-1" value={loginDetails?.username} disabled></input>
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="self-center">Book For:&nbsp;</span>
                            <input className="px-3 py-1 makeCursorPointer" required type="date" min={getTodaysDate()} value={bookedFor} onChange={BookedFor}></input>
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="self-center">Book From:&nbsp;</span>
                            <select className="makeCursorPointer" required onChange={BookedFrom} onFocus={onFocusOfBookFrom} value={bookedFrom}>
                                {bookedForValues.map((value,index) => {
                                    return <option key={index} hidden={(value === "" || hideInValidTimeForTodayDate(value) || bookedFor === "")?true:false} value={value} label={value} />
                                })}
                            </select>
                        </label>
                        <label className="flex flex-col gap-1">

                            <span className="self-center">Book To:&nbsp;</span>
                            <select className="makeCursorPointer" required onFocus={onFocusOfBookTo} onChange={BookedTo} value={bookedTo}>
                                {bookedToValues.map((value,index) => {
                                    return <option key={index} hidden={(value === "" || value <= bookedFrom || bookedFrom === "")?true:false} value={value} label={value} />
                                })}
                            </select>
                        </label>
                    </div>
                    <div className="flex w-full justify-center">
                        <button className="BookGround_button">Book Ground</button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default BookGround;