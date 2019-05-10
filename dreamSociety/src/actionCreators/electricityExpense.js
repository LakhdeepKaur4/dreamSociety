import { authHeader } from '../helper/authHeader';
import axios from 'axios';
import { URN, GET_FLOOR_OF_TOWER, ADD_ELECTRICITY_EXPENSE } from '../actions';

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

export function addElectricityExpense(values) {
    console.log(values);
    const request = axios.post(`${URN}/electricityConsumer`, values, { headers: authHeader() })

    return {
        type: ADD_ELECTRICITY_EXPENSE,
        payload: request
    }
}


