import { deletemygroundsURL } from "@/constants/APIURLS";
import axios, { AxiosError, AxiosResponse } from "axios";

export async function deleteGroundAPI(groundName:string,token:string){
    var response = {
        success : false,
        message : "",
    }
    
    await axios.delete(deletemygroundsURL,{
        headers:{
            Authorization : `Bearer ${token}`,
        },
        params:{
            groundName: groundName,
        },
        timeout: 5000,
    }).then((res:AxiosResponse)=>{
        response = {
            success:true,
            message:"Ground Deleted Successfully"
        }
    }).catch((err:AxiosError)=>{
        
        if(!err.response){
            response = {
                success:false,
                message:"Server is Down"
            }
        }
        else{
            response={
                success:false,
                message:"Something went wrong"
            }
        }
    })

    return response;
}