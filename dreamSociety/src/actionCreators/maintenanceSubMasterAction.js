import { GET_SUB_MAINTENANCE,GET_SUB_MAINTENANCE_DETAILS, POST_SUB_MAINTENANCE, URN } from '../actions';
import axios from 'axios';
import { authHeader } from '../helper/authHeader';

export function getMaintenanceSubSize(){
    const request = axios.get(`${URN}/size`, {headers: authHeader() })
    .then((response) => response.data);

    return{
        type: GET_SUB_MAINTENANCE,
        payload: request
    }
}

export function postMaintenanceSubMaster(values){
    const request = axios.post(`${URN}/maintenanceType`, values, {headers: authHeader()})
    .then((response) => response.data)
    .catch(error => alert(error));
    return {
        type: POST_SUB_MAINTENANCE,
        payload: request
    }
}

export function getMaintenanceSubSizeDetails(){
    const request = axios.get(`${URN}/maintenanceType`, {headers: authHeader()})
    .then((response) => response.data);
    return {
        type: GET_SUB_MAINTENANCE_DETAILS,
        payload: request
    }
}