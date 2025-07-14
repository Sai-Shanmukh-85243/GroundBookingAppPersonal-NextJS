
import axios from 'axios';
import { loginInputModel } from "@/models/loginInputModel";
import { loginURL } from '@/constants/APIURLS';
import { popupModel } from '@/models/popupModel';

export const checkLoginAPI = async (payload: loginInputModel) => {
    let response: object = {};
    try {
        await axios.post(
            loginURL,
            payload,
            { timeout: 5000 }
        ).then((res) => {
            response = { data: res.data };
        }).catch((err) => {
            console.log(err)
            if (!err.response) {
                response = { show: true, message: 'Server is Down', type: 'danger' };
            }
            else {
                if (err.response.status === 400) {
                    let popup:popupModel = { 
                        show: true, 
                        message: `${err.response.data.message}`, 
                        type: 'danger' 
                    };
                    response = popup;
                }
                else {
                    let popup:popupModel = { 
                        show: true, 
                        message: `Internal Server Error:${err.response.data.message}`, 
                        type: 'danger' 
                    };
                    response = popup;
                }
            }
        })
        return response;
    }
    catch (err) {
        console.log('Error in Login Slice:'+err);
        let popup:popupModel = {
            show:true,
            message:typeof err === 'string' ? err : '',
            type:'danger'
        }
        response = popup;
        return response;
    }
}