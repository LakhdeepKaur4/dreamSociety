import {URN,GET_COMPLAINTS,REJECT_COMPLAINT} from '../actions/index';
import {authHeader} from '../helper/authHeader';
import axios from 'axios';


export function getComplaints(){
    
    const request =axios.get(`${URN}/vendorComplaints`,{headers:authHeader()})
    .then(response => response.data)

    return {
        type:GET_COMPLAINTS,
        payload:request
    }
}

export const rejectComplaint=(complaintId)=>{
  
   
       const request = axios.put(`${URN}/vendorComplaints/reject`,{complaintId}, {headers:authHeader()})
        .then(response => response.data)
    
        // .then(getDetails())
        return{
    
            type:REJECT_COMPLAINT,
            payload: request 
        }
    
    }