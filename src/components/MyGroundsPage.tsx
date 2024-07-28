'use client'
import { mygroundsOutputModel } from "@/models/mygroundsOutputModel";
import { useEffect, useState } from "react";
import MyGroundsSideCard from "./MyGroundsSideCard";

const MyGroundsPage = ({ mygrounds }: { mygrounds: mygroundsOutputModel[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sideCardsFirst = currentIndex + 1;
    const sideCardsLast = currentIndex + 4;
    const sideCards = getSideCards(mygrounds, sideCardsFirst, sideCardsLast);
    function getSideCards(mygrounds: mygroundsOutputModel[], sideCardsFirst: number, sideCardsLast: number) {
        let sidegrounds = [];
        if (sideCardsLast >= mygrounds.length) {
            for (let i = mygrounds.length-4; i < mygrounds.length; i++) {
                sidegrounds.push(mygrounds[i]);
            }
        }
        else {
            for (let i = sideCardsFirst; i <= (sideCardsLast); i++) {
                sidegrounds.push(mygrounds[i]);
            }
        }
        //console.log("side grounds:",sidegrounds)
        return sidegrounds;
    }

    function changeCurrentIndex(newCurrentIndex: number) {
        setCurrentIndex(newCurrentIndex);
    }
    useEffect(()=>{
        //console.log(mygrounds[currentIndex])
    })
    return (
        <div className="w-full h-full">
            <div className="hidden lg:flex flex-col w-full h-full"> {/*for large devices*/}
                <div className={`h-full w-full`}  style={{backgroundImage: `url(${mygrounds[currentIndex].image && `data:image/png;base64,${mygrounds[currentIndex].image}`})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                    <div className={`myGroundsDesign w-full h-full text-orange-400 ${!mygrounds[currentIndex].image ? "bg-black bg-opacity-80":"bg-black bg-opacity-60"}`} >
                        <div className="myGroundsName flex justify-self-center self-center">
                            <span>{mygrounds[currentIndex].groundName}</span>
                        </div>
                        <div className="myGroundsDetails flex flex-col gap-3 items-center">
                            <span>{mygrounds[currentIndex].addedBy}</span>
                            <span>{mygrounds[currentIndex].groundLocation}</span>
                            <span>{mygrounds[currentIndex].price}</span>
                            <span>{mygrounds[currentIndex].description}</span>
                        </div>
                        <div className="myGroundsSideCards flex justify-between gap-2 pr-3 overflow-hidden">
                            {sideCards.map((sideground, index) => {
                                return <MyGroundsSideCard sideCard={sideground} changeCurrentIndex={changeCurrentIndex.bind(this)} indexOfGround={currentIndex+index+1} mygrounds={mygrounds} key={index} />
                            })}
                        </div>
                        <div className="sideCardsButtons flex justify-around items-center">
                            <span>Next</span>
                            <span>Previous</span>
                        </div>
                        <div className="myGroundsButtons flex justify-around items-center">
                            <span>Delete Ground</span>
                            <span>Edit Ground</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex lg:hidden"> {/*for small devices*/}
                <span>Small Device</span>
            </div>
        </div>
    )
}

export default MyGroundsPage;