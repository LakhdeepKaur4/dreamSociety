import {authHeader} from '../helper/authHeader';
import axios from 'axios';
import {URN, GET_TOWER_NAME,GET_FLAT_TYPE,ADD_FLAT_DETAILS,GET_FLAT_DETAILS,DELETE_FLAT_DETAIL_IDS,UPDATE_FLAT_DETAILS,GET_FLOOR_DATA} from '../actions/index';



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

export function addFlatDetails( flatNo,flatId,floor,towerId){
    const request = axios.post(`${URN}/flatDetail`, {flatNo,flatId,floor,towerId},{headers:authHeader()},{method:'POST'})
    .then(getFlatDetails());
    return{
        type:ADD_FLAT_DETAILS,
        payload:request
    }
}

export function deleteSelectedFlat(ids){
const request= axios.put(`${URN}/flatDetail/delete/deleteSelected`,{ids},{headers:authHeader()})
.then((response) => response.data)
.then(() => this.getFlatDetails());

return{
    type:DELETE_FLAT_DETAIL_IDS,
    payload:request
}
}


export function updateFlatDetails(flatDetailId,flatNo,flatId,flatType,floor,towerId,towerName  ){

    const request = axios.put(`${URN}/flatDetail/`+flatDetailId,{flatNo,flatId,flatType,floor,towerId,towerName },{headers:authHeader()})
    .then()
    return{
        type:UPDATE_FLAT_DETAILS,
        payload:request
    }
}

export  function getfloors(towerId){
    const request  = fetch(`${URN}/towerFloor/${towerId}`,  {headers:authHeader()},{method: 'GET'})
    .then(response => response.json())
    return{
          type: GET_FLOOR_DATA,
          payload: request
        } 
    }
