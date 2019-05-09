import { authHeader } from '../helper/authHeader';
import axios from 'axios';
import { URN, GET_FLOOR_OF_TOWER } from '../actions';

export function getfloorsOfTowers(towerId) {
    console.log("towerId",towerId);
    const request = axios.get(`${URN}/towerFloor/${towerId}`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error =>  error)
    return {
        type: GET_FLOOR_OF_TOWER,
        payload: request
    }
}


