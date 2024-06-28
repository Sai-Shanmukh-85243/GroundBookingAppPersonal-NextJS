import { signupURL } from "@/constants/APIURLS";
import { popupModel } from "@/models/popupModel";
import { signupInputModel } from "@/models/signupInputModel";
import axios from "axios";

export async function signupAPI(data:signupInputModel):Promise<popupModel>{
    let res:popupModel={
        show:false,
        message:'',
        type:'none'
    };
    try{
        await axios.post(signupURL,data,{
            timeout:5000
        }).then(()=>{
            res={
                show:true,
                message:'Signed Up Successfully',
                type:'success'
            }
        }).catch((err)=>{
            if(!err.response){
                res={
                    show:true,
                    message:'Server is Down',
                    type:'danger'
                } 
            }
            else{
                if (err.response.status === 400) {
                    let resMessage = JSON.parse(JSON.stringify(err.response.data))
                    res={
                        show:true,
                        message:resMessage.message,
                        type:'danger'
                    } 
                }
                else {
                    res={
                        show:true,
                        message:'Unknown Error, try performing the action again',
                        type:'danger'
                    } 
                }
            }
        })
    }
    catch{
        res={
            show:true,
            message:'Internal Server Error',
            type:'danger'
        } 
    }
    return res;
}