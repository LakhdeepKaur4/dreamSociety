import {authHeader} from '../helper/authHeader';
import axios from 'axios';
import {URN,GET_FLOOR} from '../actions/index';

export function fetchFloor(){
    const request =axios.get(`${URN}/floor`,{headers:authHeader()})
    .then(response =>response.data)
    return{
        type:GET_FLOOR,
        payload:request
    }
} 