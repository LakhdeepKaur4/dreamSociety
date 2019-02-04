import {authHeader} from '../helper/authHeader';
import axios from 'axios';
import {URN,ADD_SIZE,GET_SIZE} from '../actions';
export   function AddSize(values){
 
    const request =axios.post(`${URN}/size`,values,{headers:authHeader()})
     .then(displaySize())
      return{  
          type:ADD_SIZE,
          payload: request
      }

}

export function displaySize(){
    const request = fetch(`${URN}/size`,{headers:authHeader()},{method:'GET'})
    .then(response => response.json())
    return {
        type:GET_SIZE,
        payload:request
    }
}