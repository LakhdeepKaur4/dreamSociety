import axios from 'axios';
import { authHeader } from '../helper/authHeader';

import{URN,ADD_USER,UPDATE_USER,GET_ROLES,GET_USERS,DELETE_USER} from '../actions/index';


export function addUser(values) {
    let message;
    const request = axios.post(`${URN}/auth/signup`, values, {headers: authHeader() })
                    return {
                        type: ADD_USER,
                        payload: request
                    }
                }

export function getUsers(){
    const request = axios.get(`${URN}/user`,  {headers:authHeader()}).then((response) => response.data)
    .then()

    return {
        type: GET_USERS,
        payload:request
    }
}

export function getRoles(){
    const request = axios.get(`${URN}/user/userRole`, {headers:authHeader()})
    .then((response =>response.data))

    return {
        type: GET_ROLES,
        payload:request
    }
}

export function updateUser(userId, roleName, firstName, lastName, userName, email,towerId,familyMember,floor,parking,contact){
    const request = axios.put(`${URN}/user/`+ userId, {
        userId, roleName, firstName, lastName, userName, email,towerId,familyMember,floor,parking, contact
        }, { headers: authHeader() })
        .then(response => response.data)
    .then(() => this.getUsers())

    return {
        type: UPDATE_USER,
        payload:request
    }
} 

export function deleteUser(userId, isActive){
   const request = axios.put(`${URN}/user/delete/`  + userId, { isActive }, { headers: authHeader() })
    .then((response) => response.data)
    .then(() => this.getUsers())

    return {
        type:DELETE_USER,
        payload:request
    }
}