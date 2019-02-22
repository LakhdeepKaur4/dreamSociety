import {authHeader} from '../helper/authHeader';
import axios from 'axios';
import {URN, GET_TOWER_NAME,GET_FLAT_TYPE,ADD_FLAT_DETAILS,GET_FLAT_DETAILS} from '../actions/index';



export  function getTowerName(){
    const request  = fetch(`${URN}/tower`,  {headers:authHeader()},{method: 'GET'})
    .then(response => response.json())
    return{
          type: GET_TOWER_NAME,
          payload: request
        } 
    }

export function getFlatType(){
    const request =fetch(`${URN}/flat`,{headers:authHeader()},{method:'GET'})
    .then(response =>response.json())
    return{
        type:GET_FLAT_TYPE,
        payload:request
    }
}    

export function getFlatDetails(){
    const request =fetch(`${URN}/flatDetail`,{headers:authHeader()},{method:'GET'})
    .then(response =>response.json())
    return{
        type:GET_FLAT_DETAILS,
        payload:request
    }
}   

export function addFlatDetails(values){console.log("hiiiii")
    const request = axios.post(`${URN}/flatDetail`,values,{headers:authHeader()},{method:'POST'})
    .then()
    return{
        type:ADD_FLAT_DETAILS,
        payload:request
    }
}