import {authHeader} from '../helper/authHeader';
import axios from 'axios';
import {URN,ADD_SOCIETY_EVENTS,GET_SOCIETY_EVENTS,UPDATE_SOCIETY_EVENTS} from '../actions/index';


export function addSocietyEvents( values){
     const request = axios.post(`${URN}/createEventBooking` , values , {headers:authHeader()})
      .then(response => response.data)
   
      return{
  
        type:ADD_SOCIETY_EVENTS,
        payload:request
      }
  
  }

  export function getSocietyEvents(){
    
    const request =axios.get(`${URN}/getEventBookings`,{headers:authHeader()})
    .then(response => response.data)

    return {
        type:GET_SOCIETY_EVENTS,
        payload:request
    }
}

export function updateSocietyEvents(societyEventBookId,eventId,firstName,startDate,endDate,startTime,endTime,perPersonCharge,childAbove,charges,description ){

  const request = axios.put(`${URN}/updateEventBookings/`+societyEventBookId,{eventId,firstName,startDate,endDate,startTime,endTime,perPersonCharge,childAbove,charges,description },{headers:authHeader()})
  .then()
  return{
      type:UPDATE_SOCIETY_EVENTS,
      payload:request
  }
}