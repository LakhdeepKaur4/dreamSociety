import axios from 'axios';
import { authHeader } from '../helper/authHeader';
import{URN,GET_OWNER_DETAIL_VIA_FLATID,GET_OWNER_DETAIL,ADD_TENANT_DETAIL} from '../actions/index';

export function addTenantDetail(values){
    const request = axios.post(`${URN}/tenant`, values, {headers: authHeader() })

    return {
        type: ADD_TENANT_DETAIL,
        payload:request
    }
}

// export function getOwnerDetail(){
//     const request = axios.get(`${URN}/owner/`, {headers: authHeader() })
//     .then((response) => response.data)

//     return {
//         type: GET_OWNER_DETAIL,
//         payload: request
//     }
// }

export function getOwnerDetailViaFlatId(flatDetailId){
    const request = axios.get(`${URN}/owner/${flatDetailId}`, {headers: authHeader()})
    .then((response) => response.data)

    return {
        type: GET_OWNER_DETAIL_VIA_FLATID,
        payload:request
    }
}