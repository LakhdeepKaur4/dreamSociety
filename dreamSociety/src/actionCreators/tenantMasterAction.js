import axios from 'axios';
import { authHeader } from '../helper/authHeader';
import{URN,GET_OWNER_DETAIL_VIA_FLATID,GET_FLAT_DETAIL_VIA_TOWERID,ADD_TENANT_DETAIL, GET_TENANT_DETAIL, DELETE_TENANT} from '../actions/index';

export function addTenantDetail(values){
    console.log(values)
    const request = axios.post(`${URN}/tenant`, values, {headers: authHeader()})
    .then((response) => console.log(response.data))

    return {
        type: ADD_TENANT_DETAIL,
        payload:request
    }
}

export function getFlatDetailViaTowerId(towerId){
    console.log(towerId)
    const request = axios.get(`${URN}/owner/${towerId}`, {headers: authHeader()})
    .then((response) => response.data)

    return {
        type: GET_FLAT_DETAIL_VIA_TOWERID,
        payload:request
    }
}

export function getOwnerDetailViaFlatId(flatDetailId){
    console.log(flatDetailId)
    const request = axios.get(`${URN}/owner/getFlatDetail/${flatDetailId}`, {headers: authHeader()})
    .then((response) => response.data)

    return {
        type: GET_OWNER_DETAIL_VIA_FLATID,
        payload: request
    }
}

export function getTenantDetail(){
    const request = axios.get(`${URN}/tenant`, {headers: authHeader()})
    .then(response => response.data);

    return {
        type: GET_TENANT_DETAIL,
        payload: request
    }

}

export function deleteTenant(id){
    const data = {
        isActive: false
    }

    let {isActive} = data;
    const request = axios.put(`${URN}/tenant/delete/` + id, {isActive}, {headers: authHeader()})
    .then(response => response.data);

    return {
        type: DELETE_TENANT,
        payload: request
    }
}