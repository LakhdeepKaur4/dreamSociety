import axios from 'axios';
import { URN, REGISTER_COMPLAINT , USER_FLAT_DETAILS,POST_REGISTER_COMPLAINT,SERVICE_DETAILS,GET_REGISTER_DETAIL} from '../actions/index'
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

 export const userflatDetails=()=>{
   
    const request = axios.get(`${URN}/flatById`  , {headers:authHeader()})
     .then(response => response.data)
  
 
     
     return{
 
         type:USER_FLAT_DETAILS,
         payload: request 
     }
 
 }

 export const serviceDetails=()=>{
   
    const request = axios.get(`${URN}/vendor/service`  , {headers:authHeader()})
     .then(response => response.data)
  
 
     
     return{
 
         type:SERVICE_DETAILS,
         payload: request 
     }
 
 }


 export const postRegister=(values)=>{
     console.log("==================values", values)
     const request= axios.post(`${URN}/complaintRegister`, values , {headers:authHeader()})
     .then(response=>response.data)
     return{
 
        type:POST_REGISTER_COMPLAINT,
        payload: request 
    }
 }

 export const getRegisterDetail=()=>{
    const request= axios.get(`${URN}/userComplaints` , {headers:authHeader()})
    .then(response=>response.data)
    return{

       type:GET_REGISTER_DETAIL,
       payload: request 
   }
 }