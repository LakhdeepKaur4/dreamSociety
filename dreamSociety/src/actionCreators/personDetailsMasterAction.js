import axios from 'axios'; 
import {URN, GET_TOWER,GET_FLAT, GET_ROLES ,ADD_PERSON,GET_PERSON,DELETE_PERSON,UPDATE_PERSON1} from '../actions';
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
         
        const request = axios.get(`${URN}/user`,{headers:authHeader()})
        .then(response=>response.data)
        console.log(request,"res");
        return{
            type:GET_PERSON,
            payload:request
           
        }
 
    }

    export function deletePerson(userId,isActive){
        const request= axios.put(`${URN}/user/delete/`+userId,{isActive},{headers:authHeader()}).then()
        return{
            type:DELETE_PERSON,
            payload:request
        }
    }

    export function updatePerson( userId,userName,email,towerId,familyMember,parking,roleName){
       
       console.log('shubhu',userId,userName,email)
        const request=axios.put(`${URN}/user/` +userId, { userId,userName,email,towerId,familyMember,parking,roleName},
        { headers: authHeader() }).then((response)=>{

        })
        return{
            type:UPDATE_PERSON1,
            payload :request
        }
    }