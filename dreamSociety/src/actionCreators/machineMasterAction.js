import {authHeader} from '../helper/authHeader';
import axios from 'axios';
import {URN,ADD_MACHINE,GET_MACHINE,UPDATE_MACHINE, DELETE_MACHINE,DELETE_MULTIPLE_MACHINE}  from '../actions/index'


  
export  function addMachine(machineActualId,flatDetailId){
    const request= axios.post(`${URN}/machine `,{flatDetailId,machineActualId} ,{headers:authHeader()})
    return{
        type :ADD_MACHINE,
        payload:request
    }
}


  
export  function viewMachine(){
    const request= axios.get(`${URN}/machine`,{headers:authHeader()}).then(response=> response.data)
    return{
        type :GET_MACHINE,
        payload:request
    }
}

export function updateMachine( flatDetailId,machineActualId,machineId){
    const request =axios.put(`${URN}/machine/`+machineId,{flatDetailId,machineActualId},{headers:authHeader()})
    return{
        type:UPDATE_MACHINE,
        payload:request
    }
}

export function deleteMachine(machineId,isActive){
    const request = axios.put(`${URN}/machine/delete/` +machineId,{ isActive }, {headers:authHeader()})
    return{
        type:DELETE_MACHINE,
        payload:request
    }
}

export function deleteMultipleMachine(ids){
    const request = axios.put(`${URN}/machine/delete/deleteSelected/`,{ids},   {headers:authHeader()})
 
  return{
      type:DELETE_MULTIPLE_MACHINE,
      payload:request
  }

 }