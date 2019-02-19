import axios from 'axios';
import {authHeader} from '../helper/authHeader';
import {URN,GET_DETAIL,GET_SERVICE,ADD_SERVICE} from '../actions/index';

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
