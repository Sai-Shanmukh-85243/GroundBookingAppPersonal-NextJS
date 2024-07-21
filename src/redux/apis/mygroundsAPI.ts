import { getmygroundsURL } from "@/constants/APIURLS";
import axios, { AxiosError, AxiosResponse } from "axios";

export async function getMyGroundsAPI(username:string,token:string){
    var result ={};
    await axios.get(getmygroundsURL+username,{
        timeout:5000,
        headers:{
            Authorization:'Bearer '+token,
        }
    }).then((res:AxiosResponse)=>{
        result = {data:res.data};
    }).catch((err:AxiosError)=>{
        if(!err.response){
            result = {show:true,message:'Server is Down',type:'danger'};
        }
        else{
            result = {show:true,message:err.response.data,type:'danger'};
        }
    })
    return result;
}