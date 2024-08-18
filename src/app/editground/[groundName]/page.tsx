'use client';
import EditGroundForm from "@/components/EditGroundForm";
import Loading from "@/components/Loading";
import PromptLogin from "@/components/PromptLogin";
import { getgroundbynameURL } from "@/constants/APIURLS";
import { mygroundsOutputModel } from "@/models/mygroundsOutputModel";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { LoginSelector } from "@/redux/slices/loginSlice";
import { setPopup } from "@/redux/slices/popupSlice";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Params {
    groundName: string
}

const EditGround = ({ params }: { params: Params }) => {
    let groundName = decodeURIComponent(params.groundName);
    const loginData = useAppSelector(LoginSelector);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [groundDetails,setGroundDetails] = useState<mygroundsOutputModel>();

    useEffect(() => {
        if (loginData.status && loginData.role.slice(1, -1).toLowerCase() !== 'admin') {
            router.replace('/unauthorized');
        }
        else {
            if (loginData.status) {
                axios.get(getgroundbynameURL, {
                    timeout: 5000,
                    headers: {
                        Authorization: `Bearer ${loginData.token}`,
                    },
                    params: {
                        name: groundName,
                    }
                }).then((res: AxiosResponse) => {
                    setGroundDetails(res.data);
                }).catch((err: AxiosError) => {
                    if (!err.response) {
                        dispatch(setPopup({message:'Server is Down',show:true,type:'danger'}));
                    }
                    else{
                        dispatch(setPopup({message:err.response.data as string,show:true,type:'danger'}));
                    }
                })
            }
        }
    }, [])
    return (
        <div className="w-full h-full">
            {!loginData.status ?
                <PromptLogin messagePrefix="Edit a Ground" /> :
                !groundDetails?
                <Loading/>:
                <EditGroundForm groundDetails={groundDetails} loginData={loginData}/>
            }
        </div>
    )
}

export default EditGround;