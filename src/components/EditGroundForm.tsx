'use client';
import { updategroundURL } from "@/constants/APIURLS";
import { DialogBoxContext } from "@/Contexts/DialogBoxContext";
import { loginOutputModel } from "@/models/loginOutputModel";
import { mygroundsOutputModel } from "@/models/mygroundsOutputModel";
import { useAppDispatch } from "@/redux/hook";
import { setPopup } from "@/redux/slices/popupSlice";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const EditGroundForm = ({ groundDetails,loginData }: { groundDetails: mygroundsOutputModel,loginData:loginOutputModel }) => {
    const [seeImage, setSeeImage] = useState(false);

    const [groundLocation, setGroundLocation] = useState<string>(groundDetails.groundLocation);
    const [groundPrice, setGroundPrice] = useState<string>(groundDetails.price.toString());
    const [groundDescription, setGroundDescription] = useState<string>(groundDetails.description);
    const [groundImage, setGroundImage] = useState<File | undefined>();
    const [groundImageURL, setGroundImageURL] = useState<Blob | String>('data:image/png;base64,' + groundDetails.image);
    const [areDetailsUpdated,setAreDetailsUpdated] = useState(false);

    const dispatch = useAppDispatch();
    const router = useRouter();
    const DialogContext = useContext(DialogBoxContext);

    useEffect(() => {
        if (groundImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setGroundImageURL(reader.result as string);
            }
            reader.readAsDataURL(groundImage);
        }
    }, [groundImage])

    function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
        let regex = /^\d.$/;
        let input = e.target.value;
        if (regex.test(input)) {
            setGroundPrice(input);
            setAreDetailsUpdated(true);
        }
    }

    function handleOnEditConfirm() {
        let formdata = new FormData();
        formdata.append('groundName',groundDetails.groundName);
        formdata.append('groundLocation',groundLocation);
        formdata.append('price',groundPrice);
        formdata.append('description',groundDescription);
        formdata.append('addedBy',loginData.username);
        if(groundImage)
            formdata.append('image',groundImage);
        axios.put(updategroundURL,formdata,{
            timeout:5000,
            headers:{
                Authorization: `Bearer ${loginData.token}`,
            }
        }).then((res:AxiosResponse)=>{
            dispatch(setPopup({message:'Ground updated Successfully',show:true,type:'success'}));
            router.replace('/mygrounds');
        }).catch((err:AxiosError)=>{
            if(!err.response){
                dispatch(setPopup({message:'Server is Down',show:true,type:'danger'}));
            }
            else{
                dispatch(setPopup({message:err.response.data as string,show:true,type:'danger'}));
            }
        })
    }

    function handleOnEditNotConfirm(){

    }

    function handleEditGround(e:React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if(!areDetailsUpdated){
            dispatch(setPopup({message:'No Modification are Present',show:true,type:'warn'}));
            return;
        }
        let dialogBoxContext: DialogBoxState = {
            show: true,
            message: 'Are you Sure you want to Edit this Ground?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: handleOnEditConfirm
                },
                {
                    label: 'No',
                    onClick: handleOnEditNotConfirm
                }]
        }
        DialogContext.setDialogBox(dialogBoxContext);
    }

    return (
        <div className="h-full w-full">
            {seeImage ?
                <div className="h-full w-full" style={{ backgroundImage: `url(${groundImageURL && `${groundImageURL}`})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                    <button className="text-red-700 font-extrabold absolute right-2 hover:scale-150" onClick={() => { setSeeImage(false) }}>x</button>
                </div>
                :
                <div className="h-full w-full flex justify-center items-center">
                    <form className="border-2 border-black flex flex-col p-4">
                        <label className="flex flex-col m-2">
                            <span className="self-center">Ground Name:</span>
                            <input type='text' className="p-2 hover:cursor-not-allowed" disabled value={groundDetails.groundName}></input>
                        </label>
                        <label className="flex flex-col m-2">
                            <span className="self-center">Ground Location:</span>
                            <input type='text' className="p-2" value={groundLocation} onChange={(e) => {setGroundLocation(e.target.value); setAreDetailsUpdated(true)}}></input>
                        </label>
                        <label className="flex flex-col m-2">
                            <span className="self-center">Ground Price:</span>
                            <input type='text' className="p-2" value={groundPrice} onChange={handlePriceChange}></input>
                        </label>
                        <label className="flex flex-col m-2">
                            <span className="self-center">Ground Description:</span>
                            <input type='text' className="p-2" value={groundDescription} onChange={(e) => {setGroundDescription(e.target.value),setAreDetailsUpdated(true)}}></input>
                        </label>
                        <label className="flex flex-col m-2">
                            <span className="self-center">Ground Image:</span>
                            <div>
                                <input type='file' className="p-2" onChange={(e) => { setGroundImage(e.target.files?.[0]);setAreDetailsUpdated(true) }}></input>
                                <button className="text-[0.7rem] border-[1px] border-black p-1 rounded-full hover:bg-gray-500 hover:text-cyan-200" onClick={() => { setSeeImage(true) }}>See Image</button>
                            </div>
                        </label>
                        <button className="mt-4 rounded-lg border-2 text-center align-middle border-red-700 hover:bg-red-700 hover:text-white" onClick={handleEditGround}>Apply Changes</button>
                    </form>
                </div>}
        </div>
    )
}

export default EditGroundForm;