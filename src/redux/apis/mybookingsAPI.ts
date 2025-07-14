import { getmybookingsURL } from "@/constants/APIURLS";
import { mybookingOutputModel } from "@/models/mybookingsOutputModel";
import axios, { AxiosError, AxiosResponse } from "axios";

export async function getMyBookingsAPI(token:string,username:string){
    var result:{status:boolean,message?:string,data?:mybookingOutputModel[]} = {
        status:false
    };
    await axios.get(getmybookingsURL,{
        timeout:5000,
        headers:{
            Authorization: 'Bearer '+token
        },
        params:{
            username:username
        }
    }).then((res:AxiosResponse)=>{
        result={status:true,data:res.data}
    }).catch((err:AxiosError)=>{
        if(!err.response){
            result = {status:false,message:"Server is Down"}
        }
        else{
            var message:{message:string,success:boolean} = err.response.data as {message:string,success:boolean};
            result = {status:false,message:message.message}
        }
    })
    return result;
}