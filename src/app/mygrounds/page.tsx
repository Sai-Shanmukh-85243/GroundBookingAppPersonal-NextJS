'use client';
import MyGroundsPage from "@/components/MyGroundsPage";
import PromptLogin from "@/components/PromptLogin";
import { mygroundsOutputModel } from "@/models/mygroundsOutputModel";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { LoginSelector } from "@/redux/slices/loginSlice";
import { getMyGrounds, MyGroundsSelector } from "@/redux/slices/myGroundsSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MyGrounds = () => {
    const router = useRouter();
    const loginData = useAppSelector(LoginSelector);
    const mygrounds: mygroundsOutputModel[] = useAppSelector(MyGroundsSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (loginData.role.slice(1, -1).toLowerCase() !== "admin") {
            router.replace('/unauthorized');
        }
        else {
            dispatch(getMyGrounds());
        }
    }, [])
    return (
        <div className="w-full h-full">
            {!loginData.status ?
                <PromptLogin /> :
                <div className="w-full h-full">
                    {mygrounds.length > 0 && <MyGroundsPage mygrounds={mygrounds} />}
                </div>}
        </div>
    )
}

export default MyGrounds;