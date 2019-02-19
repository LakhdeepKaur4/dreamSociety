import {URN,ADD_VENDOR_MASTER,GET_VENDOR_MASTER,GET_RATE_TYPE} from '../actions/index';
import {authHeader} from '../helper/authHeader';
import axios from 'axios';


export function addVendorMaster(values){
    console.log(values)
    const request=axios.post(`${URN}/vendor`,values,{headers:authHeader()})
    .then(response=>response.data)

    return{
        type:ADD_VENDOR_MASTER,
        payload:request
    }
}


export function getVendorMaster(){
    
    const request =axios.get(`${URN}/vendor`,{headers:authHeader()})
    .then(response => response.data)

    return {
        type:GET_VENDOR_MASTER,
        payload:request
    }
}

export function getRateType(){
    
    const request =axios.get(`${URN}/rate`,{headers:authHeader()})
    .then(response => response.data)

    return {
        type:GET_RATE_TYPE,
        payload:request
    }
}


