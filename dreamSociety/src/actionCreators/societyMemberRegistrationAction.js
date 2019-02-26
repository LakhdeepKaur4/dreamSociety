import axios from 'axios';
import { URN, ADD_SOCIETY_MEMBER_DETAIL, GET_SOCIETY_MEMBER_DESIGNATION_DETAIL,
   GET_SOCIETY_ID, GET_SOCIETY_MEMBER_DETAILS, UPDATE_SOCIETY_MEMBER_DETAIL } from '../actions';
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
    .then((response) => response.data);
    return {
       type: GET_SOCIETY_MEMBER_DESIGNATION_DETAIL,
       payload: request
    }
 }

 export function getMemberDetails(){
    const request = axios.get(`${URN}/societyMember`, {headers: authHeader()})
    .then((response) => response.data);
    return {
       type: GET_SOCIETY_MEMBER_DETAILS,
       payload: request
    }
 }

 export function getSocietyId(){
   const request = axios.get(`${URN}/society`, {headers: authHeader()})
   .then((response) => response.data);
   return {
      type: GET_SOCIETY_ID,
      payload: request
   }
}

export function updateSocietyMemberDetails(societyId,countryId,stateId,cityId,
   locationId,currentAddress,permanentAddress,
   contactNumber,email,bankName,
   accountNumber,panCardNumber,dob,societyMemberId){
      console.log(societyId,countryId,stateId,cityId,
         locationId,currentAddress,permanentAddress,
         contactNumber,email,bankName,
         accountNumber,panCardNumber,dob,societyMemberId)
   const request = axios.put(`${URN}/societyMember/` + societyMemberId, {societyId,countryId,stateId,cityId,
      locationId,currentAddress,permanentAddress,
      contactNumber,email,bankName,
      accountNumber,panCardNumber,dob,societyMemberId}, {headers: authHeader()});

   return {
      payload: request,
      type: UPDATE_SOCIETY_MEMBER_DETAIL
   }
}
