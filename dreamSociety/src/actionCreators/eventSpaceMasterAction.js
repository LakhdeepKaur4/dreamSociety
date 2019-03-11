import axios from 'axios';
import { authHeader } from '../helper/authHeader';
import {URN,ADD_EVENT_SPACE_DETAILS,FETCH_EVENT_SPACE_DETAILS,DELETE_MULTIPLE_EVENT_SPACE_MASTER_DETAILS} from '../actions/index';


export function AddEventDetails(values){
    console.log(values);
    const request=axios.post(`${URN}/eventSpaceMaster`,values,{headers:authHeader()})
    .then(response=>response.data)

    return{
        type:ADD_EVENT_SPACE_DETAILS,
        payload:request
    }
  


}

export  function getEventDetails(){
 

    const request = axios.get(`${URN}/eventSpaceMaster`,{headers:authHeader()})
    .then(response => response.data)
    .then(console.log(request));
   
    return{

         type:FETCH_EVENT_SPACE_DETAILS,
         payload: request 
    }

}

export function deleteSelectedEventSpaceMasterDetail(ids){
    console.log(ids);
    const request = axios.put(`${URN}/eventSpaceMaster/delete/deleteSelected`, {ids}, {headers: authHeader()})
    .catch(err => err)

    return {
        type: DELETE_MULTIPLE_EVENT_SPACE_MASTER_DETAILS,
        payload: request
    }

}
