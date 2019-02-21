import {URN,ADD_EMP,GET_EMP,UPDATE_EMP,DELETE_EMP} from '../actions/index'
import axios from 'axios';
import { authHeader } from '../helper/authHeader';
export function AddEmployee(data){
    
const request= axios.post(`${URN}/employee`,data,{headers:authHeader()})

return{
    type:ADD_EMP,
    payload:request
}

}

export function ViewEmployee(){
    const request = axios.get()
    return{
        type:GET_EMP,
        payload:request
    }
}

export function updateEmployee(){
    const request = axios.put()
    return{
        type:UPDATE_EMP,
        payload:request
    }
}

export function deleteEmployee(){
    const request= axios.put()

    return{
        type:DELETE_EMP,
        payload:request
    }
}