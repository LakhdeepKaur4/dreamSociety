import axios from 'axios';
import {authHeader} from '../helper/authHeader';
import {URN,GET_DETAIL,GET_SERVICE,ADD_SERVICE,DELETE_SERVICE_IDS,DELETE_SERVICE} from '../actions/index';

export function getServiceDetail(){
    const request=axios.get(`${URN}/serviceDetail`,{headers:authHeader()})
    .then(response =>response.data)
    return {
        type:GET_DETAIL,
        payload:request
    }
}

export function getServiceType(){
    const request =axios.get(`${URN}/service`,{headers:authHeader()})
    .then(response => response.data)
    return {
        type:GET_SERVICE,
        payload:request
    }
}




export function addServiceType(values){
    const request = axios.post(`${URN}/service`,values, {headers:authHeader()})
    .then()
    return {
        type:ADD_SERVICE,
        payload:request
    }
 
}

export function deleteSelectedService(ids){
    const request= axios.put(`${URN}/service/delete/deleteSelected`,{ids},{headers:authHeader()})
    .then((response) => response.data)
    .then(() => this.getServiceType());

    return{
        type:DELETE_SERVICE_IDS,
        payload:request
    }
}


export const deleteService=(serviceId)=>{
    const data={
        serviceId,
        isActive:false
    }

    const request = axios.put(`${URN}/service/${serviceId}`,data, {headers:authHeader()})
     .then(response => response.data)
 
     // .then(getDetails())
     return{
 
         type:DELETE_SERVICE,
         payload: request 
     }
 
 }