import {authHeader} from '../helper/authHeader';
import axios from 'axios';
import {URN, GET_COUNTRY_NAME,GET_STATE_NAME,GET_CITY_NAME,ADD_LOCATION_DETAILS,GET_LOCATION_NAME,GET_LOCATION} from '../actions/index';



export  function getCountryName(){
    const request  = fetch(`${URN}/country`,  {headers:authHeader()},{method: 'GET'})
    .then(response => response.json())
    return{
          type: GET_COUNTRY_NAME,
          payload: request
        } 
    }

export function getStateName(countryId){
    const request =fetch(`${URN}/getState/${countryId}`,{headers:authHeader()},{method:'GET'})
    .then(response =>response.json())

    return{
        type:GET_STATE_NAME,
        payload:request
    }
}    
export function getCityName(stateId){
    const request =fetch(`${URN}/city/${stateId}`,{headers:authHeader()},{method:'GET'})
    .then(response =>response.json())
    return{
        type:GET_CITY_NAME,
        payload:request
    }
}  

export function getLocationName(cityId){
    console.log("cityId",cityId)
    const request =fetch(`${URN}/location/${cityId}`,{headers:authHeader()},{method:'GET'})
    .then(response =>response.json())
    return{
        type:GET_LOCATION_NAME,
        payload:request
    }
}

export function addLocationDetails(values){
    console.log('values',values)

    const request = axios.post(`${URN}/location`,values,{headers:authHeader()})
    .then()
    return{
        type:ADD_LOCATION_DETAILS,
        payload:request
    }
}

export  function getLocation(){
    const request  = fetch(`${URN}/location`,  {headers:authHeader()},{method: 'GET'})
    .then(response => response.json())
    return{
          type: GET_LOCATION,
          payload: request
        } 
    }