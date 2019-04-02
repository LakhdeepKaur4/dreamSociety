import axios from 'axios';
import { URN, ADD_VENDOR } from '../actions/index'
import { authHeader } from '../helper/authHeader';



export const addVendor=(values)=>{
   
    console.log(values)
   
    const request = axios.post(`${URN}/individualVendor` ,values , {headers:authHeader()})
     .then(response => response.data)
  
 
     return{
 
         type:ADD_VENDOR,
         payload: request 
     }
 
 }
