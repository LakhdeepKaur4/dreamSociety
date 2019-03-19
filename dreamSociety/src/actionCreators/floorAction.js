import { ADD_FLOOR,GET_FLOOR,UPDATE_FLOOR,DELETE_FLOOR,DELETE_MULTIPLE_FLOOR,URN } from '../actions';
import axios from 'axios';
import { authHeader } from '../helper/authHeader';

export function getFloor(){
   const request = axios.get(`${URN}/floor`, {headers: authHeader() })
   .then((response) =>response.data);

   return{
       type: GET_FLOOR,
       payload: request
   }
}

export function postFloor(values){
    console.log(values)
   const request = axios.post(`${URN}/floor`, values, {headers: authHeader()})
   return {
       type: ADD_FLOOR,
       payload: request
   }
}

export function deleteSelectedFloor(ids){
    const request = axios.put(`${URN}/floor/delete/deleteSelected`, {ids}, {headers: authHeader()})
    .then(response => response.data)
    .then(error => error)

    return {
        type: DELETE_MULTIPLE_FLOOR,
        payload: request
    }
}
