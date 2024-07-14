'use client';
import GroundCard from "@/components/GroundCard";
import Loading from "@/components/Loading";
import PromptLogin from "@/components/PromptLogin";
import { allGroundsOutputModel } from "@/models/allgroundsOutputModel";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getAllGrounds, groundsSelector } from "@/redux/slices/groundsSlice";
import { LoginSelector } from "@/redux/slices/loginSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AllGrounds = ({ allGrounds }: { allGrounds: Array<allGroundsOutputModel> }) => {
    const router = useRouter();

    useEffect(()=>{
        router.prefetch('/bookground');
    },[])

    const handleBook = (groundData:allGroundsOutputModel) =>{
        router.push("/bookground/"+groundData.groundName,{});
    }
    const buttons:Array<{buttonName:string,handleClick:(groundData:allGroundsOutputModel)=>void}> = [{
        buttonName : "Book",
        handleClick: handleBook.bind(this),
    }
    ];

    return (
        <div className="AllGroundsGridContainer">

            {allGrounds.length > 0 && allGrounds.map((ground, index) => {
                return (
                    <div key={index} className="AllGroundsGridItem" >
                        <GroundCard groundData={ground} buttons={buttons}/>
                    </div>
                )
            })}

        </div>
    )
}

const Grounds = () => {
    const loginData = useAppSelector(LoginSelector);
    const allGrounds: Array<allGroundsOutputModel> = useAppSelector(groundsSelector);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllGrounds(loginData.token));
    }, []);
    return (
        <div className="h-full w-full">
            {!loginData.status ?
                <PromptLogin/>
                 :
                allGrounds.length === 0 ?
                    <Loading />
                    :
                    <div className="h-full w-full">
                        <AllGrounds allGrounds={allGrounds} />
                    </div>}
        </div>
    )
}

export default Grounds;