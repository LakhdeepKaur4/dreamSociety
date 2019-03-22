import axios from 'axios';
import { authHeader } from '../helper/authHeader';
import { FETCH_BASEMENT, FETCH_PARKING, CREATE_PARKING, URN } from '../actions';

export function fetchBasement(){
    const request = axios.get(`${URN}/parking`, {headers:authHeader()});
    return {
        type: FETCH_BASEMENT,
        payload: request
    };
}

export function createParking(props){
    const request = axios.post(`${URN}/slot`, props,  {headers:authHeader()})
    .then(response => console.log(response.data));
    return {
        type: CREATE_PARKING,
        payload: request
    } 
}

export function fetchParking(props){
    const request = axios.get(`${URN}/slot`, props, {headers:authHeader()});
    return {
        type: FETCH_PARKING,
        payload: request
    }
}   

// export function deleteParking(id){
//     const request = axios.delete(`http://localhost:3002/createParking/${id}${API_KEY}`);
//     return {
//         type: DELETE_PARKING,
//         payload: request
//     }
// }