import {authHeader} from '../helper/authHeader';
import axios from 'axios';
import {URN,GET_EVENT,ADD_EVENT, GET_EVENT_ORGANISER} from '../actions/index';


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