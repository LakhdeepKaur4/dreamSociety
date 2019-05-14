import axios from 'axios';
import { authHeader } from '../helper/authHeader';
import { FETCH_EXPENSE_VIA_FLAT,CALCULATE_ELECTRICITY_EXPENSE, URN } from '../actions';

export function getExpenseDetail(flatDetailId){
    const request = axios.get(`${URN}/electricityConsumer/flat/${flatDetailId}`, {headers:authHeader()})
    .then(res => res.data)

    return {
        type: FETCH_EXPENSE_VIA_FLAT,
        payload: request
    };
}

export function calculateCharges(data){
    const request = axios.put(`${URN}/electricityConsumer/calculate/charges`, data ,  {headers:authHeader()})
    .then(res => res.data)

    return {
        type: CALCULATE_ELECTRICITY_EXPENSE,
        payload: request
    };
}