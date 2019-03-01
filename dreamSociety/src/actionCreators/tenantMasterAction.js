import axios from 'axios';
import { authHeader } from '../helper/authHeader';
import{URN} from '../actions/index';

export function getTenantDetail(){
    const request = axios.get(`${URN}/owner/`, {headers: authHeader() })
    .then((response) => response.data)

    return {
        type: 'GET_TENANT_DETAIL',
        payload: request
    }
}