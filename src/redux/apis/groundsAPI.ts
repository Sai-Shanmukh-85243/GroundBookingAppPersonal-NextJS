import { allgroundsURL } from "@/constants/APIURLS";
import axios from "axios";

export async function getAllGroundsApi(token: string) {
    let result: any;
    try {
        await axios.get(allgroundsURL, {
            timeout: 5000,
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            result = res.data;
        }).catch((err) => {
            if (!err.response) {
                result = { message: "server is down", show: true, type: 'danger' };
            }
            else {
                result = { message: `some error occured:${err.response.data.message}`, show: true, type: 'danger' };
            }
        })
    }
    catch {
        result = { message: "Unknown Error", show: true, type: 'danger' };
    }
    return result;
}