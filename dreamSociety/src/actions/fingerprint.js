import { authHeader } from '../helper/authHeader';
import axios from 'axios';
import { URN,GET_FINGERPRINT_DATA,GET_MACHINE_DATA} from '../actionCreators/index';

export function getFingerprintData() {
    const request = axios.get(`${URN}/fingerPrint/userFlats`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => error)
    return {
        type:GET_FINGERPRINT_DATA,
        payload: request
    }
}

export function getMachineData(flatDetailId) {
    const request = axios.get(`${URN}/machine/${flatDetailId}`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => error)
    return {
        type:GET_MACHINE_DATA,
        payload: request
    }
}