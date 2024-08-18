'use client';
import PromptLogin from "@/components/PromptLogin";
import { addmygroundURL } from "@/constants/APIURLS";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { LoginSelector } from "@/redux/slices/loginSlice";
import { getMyGrounds } from "@/redux/slices/myGroundsSlice";
import { setPopup } from "@/redux/slices/popupSlice";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const AddGround = () => {
    const loginData = useAppSelector(LoginSelector);
    const router = useRouter();
    const disptach = useAppDispatch();
    const [groundName, setGroundName] = useState<string>("");
    const [groundLocation, setGroundLocation] = useState<string>("");
    const [groundPrice, setGroundPrice] = useState<string>();
    const [groundDescription, setGroundDescription] = useState<string>("");
    const [groundImage, setGroundImage] = useState<File | undefined>();

    useEffect(() => {
        if (loginData.status && loginData.role.slice(1, -1).toLowerCase() !== 'admin') {
            router.replace('/unauthorized');
        }
    }, [])

    function handlePriceChange(e:React.ChangeEvent<HTMLInputElement>){
        let regex = /^\d*$/;
        if(regex.test(e.target.value))
            setGroundPrice(e.target.value)

    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let requiredDatafilled = true;

        let popmessage = "Please fill out the required Fields - ";
        if (!groundName) {
            popmessage += "Ground Name";
            requiredDatafilled = false;
        }
        if (!groundDescription) {
            if(!requiredDatafilled){
                popmessage+=",";
            }
            popmessage += "Ground Description";
            requiredDatafilled = false;
        }
        if (!groundPrice) {
            if(!requiredDatafilled){
                popmessage+=",";
            }
            popmessage += "Ground Price";
            requiredDatafilled = false;
        }
        if (!groundLocation) {
            if(!requiredDatafilled){
                popmessage+=",";
            }
            popmessage += "Ground Location";
            requiredDatafilled = false;
        }

        if (!requiredDatafilled) {
            disptach(setPopup({ message: popmessage, type: 'danger', show: true }))
        }
        else {

            var formdata = new FormData();
            formdata.append("groundName", groundName);
            if (groundImage)
                formdata.append("image", groundImage);
            formdata.append("groundLocation", groundLocation);
            if (groundPrice)
                formdata.append('price', Number(groundPrice).toFixed());
            formdata.append("description", groundDescription);
            formdata.append("addedBy", loginData.username);

            axios.post(addmygroundURL, formdata,
                {
                    timeout: 5000,
                    headers: {
                        Authorization: `Bearer ${loginData.token}`
                    }
                }).then((res: AxiosResponse) => {
                    disptach(setPopup({ message: 'Ground Added Successfully', show: true, type: 'success' }));
                    disptach(getMyGrounds());
                    router.replace('/mygrounds');
                }).catch((err: AxiosError) => {
                    if (!err.response) {
                        disptach(setPopup({ message: 'Server is Down', show: true, type: 'danger' }));
                    }
                    else {
                        disptach(setPopup({ message: err.response.data as string, show: true, type: 'danger' }));
                    }
                })
        }

    }

    return (
        <div className="h-full w-full">
            {!loginData.status ?
                <PromptLogin messagePrefix="Add a ground" /> :
                <div className="h-full w-full addgroundContainer">
                    <div className="addGroundHeader">
                        <span>
                            Add Ground
                        </span>
                    </div>
                    <form className="addGroundFormContents" onSubmit={handleSubmit}>

                        <div className="flex flex-col gap-1 m-1">
                            <label htmlFor="groundname">Ground Name:<span className="text-red-600 text-sm">*</span></label>
                            <input id="groundname" type='text' value={groundName} onChange={(e) => { setGroundName(e.target.value) }} />
                        </div>
                        <div className="flex flex-col gap-1 m-1">
                            <label htmlFor="groundlocation">Ground Location:<span className="text-red-600 text-sm">*</span></label>
                            <input id="groundlocation" type='text' value={groundLocation} onChange={(e) => { setGroundLocation(e.target.value) }} />
                        </div>
                        <div className="flex flex-col gap-1 m-1">
                            <label htmlFor="groundprice">Ground Price:<span className="text-red-600 text-sm">*</span></label>
                            <input id="groundprice" type='text' value={groundPrice} onChange={handlePriceChange} />
                        </div>
                        <div className="flex flex-col gap-1 m-1">
                            <label htmlFor="grounddescription">Ground Description:<span className="text-red-600 text-sm">*</span></label>
                            <input id="grounddescription" type='text' value={groundDescription} onChange={(e) => { setGroundDescription(e.target.value) }} />
                        </div>
                        <div className="flex flex-col gap-1 m-1">
                            <label htmlFor="groundimage">Ground Image:</label>
                            <input id="groundimage" type='file' onChange={(e) => { setGroundImage(e.target.files?.[0]) }} />
                        </div>
                        <div className="flex justify-center">
                            <button className="addGroundButton" type="submit">Add</button>
                        </div>


                    </form>
                    <div className="addGroundFooter">
                        <button className="goback" onClick={() => { router.back() }}>Go Back</button>
                    </div>
                </div>

            }
        </div>
    )
}

export default AddGround;