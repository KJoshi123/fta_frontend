import Response from '../Models/Response';
import axios from 'axios';
import { backendUrl} from '../Constants/commonConstants';
import { exerciseObject } from '../Types/Types';

export default class ApiService{

    public static async getList<T>(url : String):Promise<Response>{
        let res = await axios.get<Array<T>>(backendUrl + url)
            .then((response : any ) => {
                const result = response.data;
                if(result && result.statuscode === 200){
                    return new Response(200, result.data  as Array<T>, "Success", "");
                }else{
                    console.log(result.message);
                    return new Response(result.statuscode, null, result.message, result.message);
                }
            })
            .catch(function (error) {
                return new Response(500, null, "Error", error);
            });
            return res;
    }

    public static async postData(payload : exerciseObject) {
        const url = backendUrl + 'saveexercise';
        const header = {
            'Content-Type' : 'application/json'
        };

        await axios.post(url,payload)
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }
}