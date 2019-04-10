import axios from 'axios';
import { URN, REGISTER_COMPLAINT } from '../actions/index'
import { authHeader } from '../helper/authHeader';



export const registerComplaint=(values)=>{
   
    console.log(values)
   
    const request = axios.post(`${URN}/registerComplaint` ,values , {headers:authHeader()})
     .then(response => response.data)
  
 
     
     return{
 
         type:REGISTER_COMPLAINT,
         payload: request 
     }
 
 }
