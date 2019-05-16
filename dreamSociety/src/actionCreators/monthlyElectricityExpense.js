import axios from 'axios';
import { authHeader } from '../helper/authHeader';
import { FETCH_EXPENSE_VIA_FLAT,CALCULATE_ELECTRICITY_EXPENSE,ADD_MONTHLY_ELEC_CHARGES,GET_ELECT_EXPENSE_DETAIL,
    UPDATE_MONTHLY_ELECTRICITY_EXPENSE, URN } from '../actions';

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

export function addMonthlyElecCharges(values){
    const request = axios.post(`${URN}/electricityConsumer`, values, {headers:authHeader()})

    return {
        type:ADD_MONTHLY_ELEC_CHARGES,
        payload:request
    }
}

export function getMonthlyElecExpense(){
    const request = axios.get(`${URN}/electricityConsumer`, {headers:authHeader()})
    .then(res => res.data)

    return {
        type: GET_ELECT_EXPENSE_DETAIL,
        payload:request
    }
}

export function updateElecExpense(data){
    let electricityConsumerId = data.electricityConsumerId;
    console.log(electricityConsumerId);
    console.log(data);
    const request = axios.put(`${URN}/electricityConsumer/${electricityConsumerId}`, {data}, {headers:authHeader()})

    return {
        type:UPDATE_MONTHLY_ELECTRICITY_EXPENSE,
        payload:request
    }
}
