'use client'
import { mygroundsOutputModel } from "@/models/mygroundsOutputModel";
import { useContext, useEffect, useState } from "react";
import MyGroundsSideCard from "./MyGroundsSideCard";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setDialogContect, showDialogBox } from "@/redux/slices/dialogBoxSlice";
import { dialogboxButtonsArray, dialogPayload } from "@/models/dialogboxInputModel";
import { DialogBoxContext } from "@/Contexts/DialogBoxContext";
import { deleteGround, DeleteGroundSelector, setDeleteGroundStatus } from "@/redux/slices/deleteGroundSlice";
import { getMyGrounds } from "@/redux/slices/myGroundsSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MyGroundsPage = ({ mygrounds }: { mygrounds: mygroundsOutputModel[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sideCardStartIndex, setSideCardStartIndex] = useState(0);
    const { setDialogBox } = useContext(DialogBoxContext);
    const router = useRouter();
    let sideCardEndIndex = mygrounds.length > 4 ? sideCardStartIndex + 3 : mygrounds.length - 1;
    const dispatch = useAppDispatch();
    const wasGroundDeleted = useAppSelector(DeleteGroundSelector).status;
    if (wasGroundDeleted === false) {
        setCurrentIndex(currentIndex + 1);
        dispatch(setDeleteGroundStatus(null))
    }
    const sideCards = getSideCards(); //calling this function set the side cards
    function getSideCards() {
        let tempSideCards = []
        for (let i = sideCardStartIndex; i <= sideCardEndIndex; i++) {
            tempSideCards.push(mygrounds[i]);
        }
        return tempSideCards;
    }

    function changeCurrentIndex(newCurrentIndex: number) {
        setCurrentIndex(newCurrentIndex);
    }
    function handleDelete(): void {
        //alert('Deleting ground')
        setCurrentIndex(currentIndex - 1);
        dispatch(deleteGround(mygrounds[currentIndex].groundName));
    }

    function handleNoDelete() {
        //alert('Deleting ground canceled')
    }
    function handleDeleteButton() {
        let buttons: dialogBoxButtonsState[] = [
            {
                label: 'Yes',
                onClick: handleDelete,

            },
            {
                label: 'No',
                onClick: handleNoDelete,
            }
        ]
        let dialogcontent: DialogBoxState = {
            show: true,
            message: 'Are you sure you want to delete this ground?',
            buttons,
            // height:'80%',
            // width:'80%',
        }

        setDialogBox(dialogcontent);
    }
    function handleRefresh() {
        dispatch(getMyGrounds());
    }

    return (
        <div className="w-full h-full">
            {
                mygrounds[currentIndex] &&
                <div className="w-full h-full">
                    <div className="hidden lg:flex flex-col w-full h-full"> {/*for large devices*/}
                        <div className={`h-full w-full`} style={{ backgroundImage: `url(${mygrounds[currentIndex].image && `data:image/png;base64,${mygrounds[currentIndex].image}`})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                            <div className={`myGroundsDesign w-full h-full text-orange-400 ${!mygrounds[currentIndex].image ? "bg-black bg-opacity-80" : "bg-black bg-opacity-60"}`} >
                                <div className="myGroundsName flex items-center">
                                    <div className="w-full flex justify-end">
                                        <span className="firstLetterCapital myGroundTitle">{mygrounds[currentIndex].groundName}</span>
                                    </div>
                                    <div className="w-full flex gap-3 justify-end mr-10">
                                        <Link className="addbutton" href={'addground'}> Add Ground</Link>
                                        <button className="refreshbutton" onClick={handleRefresh}> Refresh </button>
                                    </div>
                                </div>
                                {mygrounds.length <= 0 ?
                                    <div className="w-full h-full flex justify-center items-center">
                                        <span className="text-center text-pretty">There are no grounds registered under you.<br />Please Click on "Add Ground" to Add a Ground</span>
                                    </div> :
                                    <div className="w-full h-full myGroundSubContainer">
                                        <div className="myGroundsDetails flex flex-col gap-3 justify-center items-center">
                                            <span className="firstLetterCapital myGroundInfo">{mygrounds[currentIndex].addedBy}</span>
                                            <span className="firstLetterCapital myGroundInfo">{mygrounds[currentIndex].groundLocation}</span>
                                            <span className="firstLetterCapital myGroundInfo">{mygrounds[currentIndex].price}</span>
                                            <span className="firstLetterCapital myGroundInfo">{mygrounds[currentIndex].description}</span>
                                        </div>
                                        <div className="myGroundsSideCards flex justify-between gap-3 pr-3 overflow-hidden p-3">
                                            {sideCards.map((sideground, index) => {
                                                return <MyGroundsSideCard sideCard={sideground} changeCurrentIndex={changeCurrentIndex.bind(this)} indexOfGround={currentIndex + index + 1} mygrounds={mygrounds} key={index} />
                                            })}
                                        </div>
                                        <div className="sideCardsButtons flex justify-around items-center">
                                            <button className="nextPrevButton" onClick={() => setSideCardStartIndex((prev) => prev - 1)} disabled={sideCardStartIndex <= 0 ? true : false}><span className="nextPrevButtonText">&larr;</span></button>
                                            <button className="nextPrevButton" onClick={() => setSideCardStartIndex((prev) => prev + 1)} disabled={sideCardEndIndex >= (mygrounds.length - 1) ? true : false}><span className="nextPrevButtonText">&rarr;</span></button>
                                        </div>
                                        <div className="myGroundsButtons flex justify-around items-center gap-3 p-3">
                                            <button className="mainButtons deletebutton" onClick={handleDeleteButton}>Delete Ground</button>
                                            <Link href={'/editground/' + mygrounds[currentIndex].groundName} className="mainButtons editbutton flex items-center justify-center"><span>Edit Ground</span></Link>
                                        </div>

                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex lg:hidden w-full h-full p-1"> {/*for small devices*/}
                        {mygrounds[currentIndex]
                            &&
                            <div className="myGroundSmallDeviesMainContainer" style={{ backgroundImage: `url(${mygrounds[currentIndex].image && `data:image/png;base64,${mygrounds[currentIndex].image}`})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                                <div className="w-full h-full flex flex-col justify-around items-center bg-opacity-40 bg-black">
                                    <div className="w-full flex flex-col gap-2">
                                        <div className="w-full flex justify-center">
                                            <span className="smallDevicesSpan underline overline">{mygrounds[currentIndex].groundName}</span>
                                        </div>
                                        <div className="w-full flex justify-between p-3">
                                            <Link className="smallDeviesButton" href={'addground'}> Add Ground</Link>
                                            <button className="smallDeviesButton" onClick={handleRefresh}> Refresh </button>
                                        </div>
                                    </div>
                                    <div className="smallDeviceGroundDetailsContainer">
                                        <div>
                                            <label className="smallDevicesLabel">Location: </label>
                                            <span className="smallDevicesSpan">{mygrounds[currentIndex].groundLocation}</span>
                                        </div>
                                        <div>
                                            <label className="smallDevicesLabel">Owner: </label>
                                            <span className="smallDevicesSpan">{mygrounds[currentIndex].addedBy}</span>
                                        </div>
                                        <div>
                                            <label className="smallDevicesLabel">Price: </label>
                                            <span className="smallDevicesSpan">{mygrounds[currentIndex].price}</span>
                                        </div>
                                        <div>
                                            <label className="smallDevicesLabel">Description: </label>
                                            <span className="smallDevicesSpan">{mygrounds[currentIndex].description}</span>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="w-full flex justify-between p-3">
                                            <button className="smallDeviesButton" onClick={handleDeleteButton}>Delete Ground</button>
                                            <Link href={'/editground/' + mygrounds[currentIndex].groundName} className="smallDeviesButton"><span>Edit Ground</span></Link>
                                        </div>
                                        <div className="w-full flex justify-between px-[30%]">
                                            <button className={`smallDeviesButton ${currentIndex===0?'cursor-not-allowed':''}`} onClick={() => { currentIndex>0?setCurrentIndex(currentIndex - 1):null }}>Previous</button>
                                            <button className={`smallDeviesButton ${currentIndex===(mygrounds.length-1)?'cursor-not-allowed':''}`} onClick={() => { currentIndex<(mygrounds.length-1)?setCurrentIndex(currentIndex + 1):null }}>Next</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default MyGroundsPage;