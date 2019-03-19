import axios from 'axios';
import { URN, CHANGE_PASSWORD } from '../actions/index'
import { authHeader } from '../helper/authHeader';



export const changePassword=(values)=>{
   
    console.log(values)
    // app.get('/api/user/changePassword', [authJwt.verifyToken], userController.changePassword);
    const request = axios.post(`${URN}/user/changePassword` ,values , {headers:authHeader()})
     .then(response => response.data)
  
 
     
     return{
 
         type:CHANGE_PASSWORD,
         payload: request 
     }
 
 }
