import {authHeader} from '../helper/authHeader';
import axios from 'axios';
import {URN,GET_EVENT,ADD_EVENT, GET_EVENT_ORGANISER, DELETE_EVENT,UPDATE_EVENT} from '../actions/index';


export function ViewEvent(){
    console.log('byrr');
    const request = axios.get(`${URN}/event`,{headers:authHeader()})
    .then(response=> response.data)
    return{
        type:GET_EVENT,
        payload:request
    }
    }
    
    export function GetEventOrganiser(){
          console.log('hii')
        const request = axios.get(`${URN}/eventOrganiser`,{headers:authHeader()})
        .then(response=> response.data )
        return{
            type: GET_EVENT_ORGANISER,
            payload:request
        }
    }
    
    
    
    export  function AddEvent(values){
        const request= axios.post(`${URN}/event`,values,{headers:authHeader()}).then()
        return{
            type:ADD_EVENT,
            payload:request
        }
    }
    export function deleteEvent(eventId,isActive){

        const request = 
          axios.put(`${URN}/event/delete/` + eventId, { isActive }, { headers: authHeader() }).then((response) => {
                       
                        

                }) 
                return{
                    type:DELETE_EVENT,
                    payload:request
                }
    }
    export function updateEvent( eventId, eventType, eventName, eventOrganiser, startDate, endDate, userId ){
   console.log( eventId, eventType, eventName, eventOrganiser, startDate, endDate, userId );
        const request =
        axios.put(`${URN}/event/`+eventId,{ userId, eventType, eventName, eventOrganiser, startDate, endDate },{headers:authHeader()}).then((response)=>{

        })
 
         return {
             type:UPDATE_EVENT,
             payload:request
         }
    }