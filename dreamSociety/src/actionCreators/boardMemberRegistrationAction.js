import axios from 'axios';
import { URN, ADD_BOARD_MEMBER_DETAIL,GET_BOARD_MEMBER_DESIGNATION_DETAIL,
   GET_BOARD_MEMBER_DETAILS,GET_BOARD_ID,UPDATE_BOARD_MEMBER_DETAIL,
 DELETE_BOARD_MEMBER_DETAIL,DELETE_MULTIPLE_BOARD_MEMBER_DETAIL } from '../actions';
import { authHeader } from '../helper/authHeader';

 export function addMemberDetails(values){
    const request = axios.post(`${URN}/societyMember`, values, {headers: authHeader()});
    return {
      type: ADD_BOARD_MEMBER_DETAIL,
      payload: request
  }
 }

 export function getMemberDesignation(){
    const request = axios.get(`${URN}/designation`, {headers: authHeader()})
    .then((response) => response.data);
    return {
       type: GET_BOARD_MEMBER_DESIGNATION_DETAIL,
       payload: request
    }
 }

 export function getMemberDetails(){
    const request = axios.get(`${URN}/societyMember`, {headers: authHeader()})
    .then((response) => response.data);
    return {
       type: GET_BOARD_MEMBER_DETAILS,
       payload: request
    }
 }

 export function getSocietyId(){
   const request = axios.get(`${URN}/society`, {headers: authHeader()})
   .then((response) => response.data);
   return {
      type: GET_BOARD_ID,
      payload: request
   }
}

export function updateSocietyMemberDetails(societyId,societyMemberName,designationId,countryId,stateId,cityId,
   locationId,currentAddress,permanentAddress,
   contactNumber,email,bankName,
   accountNumber,panCardNumber,dob,societyMemberId){
   const request = axios.put(`${URN}/societyMember/` + societyMemberId, {societyId,societyMemberName,designationId
      ,countryId,stateId,cityId,
      locationId,currentAddress,permanentAddress,
      contactNumber,email,bankName,
      accountNumber,panCardNumber,dob,societyMemberId}, {headers: authHeader()})
      .then(() => this.getMemberDetails());

   return {
      payload: request,
      type: UPDATE_BOARD_MEMBER_DETAIL
   }
}

export function deleteSocietyMemberDetail(societyMemberId){
   const data = {
      isActive: false
   }
   let {isActive} = data;
   const request = axios.put(`${URN}/societyMember/delete/` + societyMemberId, {isActive}, {headers: authHeader()})
   .then(() => this.getMemberDetails());

   return {
      payload: request,
      type: DELETE_BOARD_MEMBER_DETAIL
   }
}

export function deleteMultipleSocietyMemberDetail(ids){
   const request = axios.put(`${URN}/societyMember/delete/deleteSelected`, {ids}, {headers: authHeader()})
   .then(() => this.getMemberDetails());

   return{
      payload:request,
      type: DELETE_MULTIPLE_BOARD_MEMBER_DETAIL
   }
}
