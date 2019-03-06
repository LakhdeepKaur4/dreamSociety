import {URN,ADD_VENDOR_MASTER,GET_VENDOR_MASTER,GET_RATE_TYPE,DELETE_VENDOR,UPDATE_VENDOR} from '../actions/index';
import {authHeader} from '../helper/authHeader';
import axios from 'axios';


export function addVendorMaster(formData){
    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
    console.log(formData)
    const request=axios.post(`${URN}/vendor`, formData,{headers:authHeader()},config)
    .then(getVendorMaster())


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

export function deleteVendor(vendorId,isActive){
 
console.log("id",vendorId);
    const request = axios.put(`${URN}/vendor/delete/`+vendorId,{isActive}, {headers:authHeader()})
     .then()
 
     
     return{
 
         type:DELETE_VENDOR,
         payload: request 
     }
}


export function updateVendor(vendorId,formData){
    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
        const request = axios.put(`${URN}/vendor/`+vendorId,formData, {headers:authHeader()},config)
         .then(this.getVendorMaster());
     
         
         return{
     
             type:UPDATE_VENDOR,
             payload: request 
         }
    }
    
