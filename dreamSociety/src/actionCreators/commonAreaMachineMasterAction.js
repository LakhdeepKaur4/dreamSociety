import {URN,ADD_COMMON_AREA_MACHINE,GET_COMMON_AREA_MACHINE,UPDATE_AREAS_MACHINE,DELETE_AREA_MACHINE,DELETE_AREA_MACHINE_IDS} from '../actions/index';
import {authHeader} from '../helper/authHeader';
import axios from 'axios';


export function addCommonAreaMachine(commonArea){
    const request = axios.post(`${URN}/commonArea`,{commonArea}, {headers:authHeader()})
   
    return {
        type:ADD_COMMON_AREA_MACHINE,
        payload:request
    }
 
}

export function getCommonAreaMachine(){
    const request=axios.get(`${URN}/commonArea`,{headers:authHeader()})
    .then(response =>response.data)
    return {
        type:GET_COMMON_AREA_MACHINE,
        payload:request
    }
}

export function updateMachineAreas(commonAreaId,commonArea){

    const request = axios.put(`${URN}/commonArea/`+commonAreaId,{commonArea},{headers:authHeader()})
    .then()
    return{
        type:UPDATE_AREAS_MACHINE,
        payload:request
    }
}

export const deleteCommonAreaMachine=(commonAreaId,isActive)=>{
    
       const request = axios.put(`${URN}/commonArea/delete/${commonAreaId}`,{isActive}, {headers:authHeader()})
        .then(response => response.data)
    
     
        return{
    
            type:DELETE_AREA_MACHINE,
            payload: request 
        }
    
    }


    export function deleteSelectedCommonAreaMachine(ids){
        const request= axios.put(`${URN}/commonArea/delete/deleteSelected`,{ids},{headers:authHeader()})
        .then((response) => response.data)
        .then(() => this.getCommonArea())
        ;
    
        return{
            type:DELETE_AREA_MACHINE_IDS,
            payload:request
        }
    }