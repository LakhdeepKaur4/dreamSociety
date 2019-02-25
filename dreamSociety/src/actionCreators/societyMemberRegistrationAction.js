import axios from 'axios';
import { URN, ADD_SOCIETY_MEMBER_DETAIL, GET_SOCIETY_MEMBER_DESIGNATION_DETAIL } from '../actions';
import { authHeader } from '../helper/authHeader';

 export function addMemberDetails(values){
    const request = axios.post(`${URN}/societyMember`, values, {headers: authHeader()});
    return {
      type: ADD_SOCIETY_MEMBER_DETAIL,
      payload: request
  }
 }

 export function getMemberDesignation(){
    const request = axios.get(`${URN}/designation`, {headers: authHeader()})
    .then((response) => response.data);;
    return {
       type: GET_SOCIETY_MEMBER_DESIGNATION_DETAIL,
       payload: request
    }
 }
