import axios from 'axios';
import { URN, GET_COUNTRY, GET_STATE, GET_CITY, GET_LOCATION_DETAIL,  GET_SOCIETY, DETAIL_SOCIETY,POST_SOCIETY, DELETE_SOCIETY,UPDATE_SOCIETY } from '../actions/index';
import { authHeader } from '../helper/authHeader';



export const getCountry = () => {
    console.log('========countryAction========')

    const request = axios.get(`${URN}/country`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => console.log('==error==', error))

    return {

        type: GET_COUNTRY,
        payload: request
    }
}


export const getState = countryId => {
    console.log('========stateAction========')

    const request = axios.get(`${URN}/getState/${countryId}`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => console.log('==error==', error))

    return {
        type: GET_STATE,
        payload: request
    }
}

export const getCity = stateId => {

    console.log('========cityAction========')
    const request = axios.get(`${URN}/city/${stateId}`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => console.log('==error==', error))

    return {
        type: GET_CITY,
        payload: request
    }
}

export const getLocation = cityId => {

    console.log('========locationAction========')
    const request = axios.get(`${URN}/location/${cityId}`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => console.log('==error==', error))

    return {
        type: GET_LOCATION_DETAIL,
        payload: request
    }
}


export const postSociety = (values) => {
    
    console.log('========valueSocietyAction========', values)
    const request = axios.post(`${URN}/society`,values, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => console.log('==error==', error))

    return {
        type: POST_SOCIETY,
        payload: request
    }
}

export const getSociety = (locationId) => {

    console.log('========valueSocietyAction========')
    const request = axios.get(`${URN}/society/${locationId}`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => console.log('==error==', error))

    return {
        type: GET_SOCIETY,
        payload: request
    }
}


export const deleteSociety=(societyId)=>{
    const data={
        societyId,
        isActive:false
    }
    console.log("=================delete", societyId)
    const request = axios.put(`${URN}/society/delete/${societyId}`,data, {headers:authHeader()})
     .then(response => response.data)
 
     // .then(getDetails())
     return{
 
         type:DELETE_SOCIETY,
         payload: request 
     }
 
 }

 export const detailSociety = () => {

    console.log('========valueSocietyAction========')
    const request = axios.get(`${URN}/society`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => console.log('==error==', error))

    return {
        type: DETAIL_SOCIETY,
        payload: request
    }
}

 export const updateSociety=(societyId, countryId, stateId,cityId, locationId, societyName)=>{
     console.log('==updateCity====',societyId, countryId, stateId,cityId, locationId, societyName )
    
    const request = axios.put(`${URN}/society/`+ societyId ,{countryId, stateId,cityId, locationId, societyName}, {headers:authHeader()})
     .then(response => response.data)
 
     // .then(getDetails())
     return{
 
         type:UPDATE_SOCIETY,
         payload: request
     }
 
 }

