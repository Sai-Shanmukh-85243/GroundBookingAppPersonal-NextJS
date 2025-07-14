import { addbookingURL } from "@/constants/APIURLS";
import { bookgroundInputModel } from "@/models/bookgroundInputModel";
import axios, { AxiosError, AxiosResponse } from "axios";

export async function addBookingAPI(data:bookgroundInputModel,token:string){
    var result = {};
    await axios.post(addbookingURL,data,{
        timeout:5000,
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((res: AxiosResponse)=>{
        result = {status:true};
    }).catch((err:AxiosError)=>{
        if(!err.response){
            result = {message:"Server is Down" , status:false};
        }
        else{
        var message:{message:string,success:boolean} = err.response.data as {message:string,success:boolean};
        result = {message:message.message , status:false};
        }
    })
    return result;
}