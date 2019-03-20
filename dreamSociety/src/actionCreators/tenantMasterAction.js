import axios from 'axios';
import { authHeader } from '../helper/authHeader';
import{URN,GET_OWNER_DETAIL_VIA_FLATID,GET_FLAT_DETAIL_VIA_TOWERID,UPDATE_TENANT_DETAIL,GET_TENANT_MEMBER_DETAILS,
    DELETE_SELECTED_TENANT,ADD_TENANT_DETAIL, GET_TENANT_DETAIL, DELETE_TENANT} from '../actions/index';

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
    .then(() => this.getTenantDetail());

    return {
        type: DELETE_TENANT,
        payload: request
    }
}

export function deleteSelectedTenant(ids){
    const request = axios.put(`${URN}/tenant/delete/deleteSelected`, {ids}, {headers: authHeader()})
    .then(response => response.data);

    return {
        type: DELETE_SELECTED_TENANT,
        payload: request
    }
}

export function updateTenantDetail(tenantName,gender, email, contact, aadhaarNumber, dob, permanentAddress, fileName, towerName, flatNo, towerId,
    picture, flatDetailId, tenantId){
        console.log(tenantName,gender, email, contact, aadhaarNumber, dob, permanentAddress, fileName, towerName, flatNo, towerId,
            picture, flatDetailId, tenantId)
        const request = axios.put(`${URN}/tenant/` + tenantId, {tenantName,gender, email, contact, aadhaarNumber,dob,
             permanentAddress, fileName, towerName, flatNo, towerId,
            picture, flatDetailId, tenantId}, {headers: authHeader()})

            return {
                type: UPDATE_TENANT_DETAIL,
                payload:request
            }
    }

export function viewMember(id){
    const request = axios.get(`${URN}/tenant/members/` + id, {headers: authHeader()})
    .then(response => response.data)

    return {
        type: GET_TENANT_MEMBER_DETAILS,
        payload:request
    }
}