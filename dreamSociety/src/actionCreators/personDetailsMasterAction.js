import axios from 'axios'; 
import {URN, GET_TOWER,GET_FLAT, GET_ROLES ,ADD_PERSON,GET_PERSON} from '../actions';
import { authHeader } from '../helper/authHeader';


export function getTower(){
           
    const request = axios.get(`${URN}/tower`, {headers:authHeader()}  )
    .then(response=>response.data)
    return{

       type:GET_TOWER,
       payload:request

    }

}
    export function getFlat(){
        const request = axios.get(`${URN}/flat`,{headers:authHeader()})
        .then(response=>response.data)

        return{
            type:GET_FLAT,
            payload:request
        }
    }


    export function  getRoles(){
        const request =axios.get(`${URN}/user/userRole`,{headers:authHeader()})
      .then(response=>response.data)
      return{
          type:GET_ROLES,
          payload:request
      }
     }

     export function addPerson(values){
         
      const request =axios.post(`${URN}/auth/signup`,values,{headers:authHeader()})
      .then()
      console.log(values,"abc")
         return{
             type:ADD_PERSON,
             payload:request
         }
     }

     export function viewPerson(){
         const request = axios.get(`{URN}/auth/signup`,{headers:authHeader()})
         .then()
         return{
             type:GET_PERSON,
             payload:request
         }
     }