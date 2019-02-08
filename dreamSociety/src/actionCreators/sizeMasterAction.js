import {authHeader} from '../helper/authHeader';
import axios from 'axios';
import {URN,ADD_SIZE,GET_SIZE,DELETE_SIZE, UPDATE_SIZE1} from '../actions';
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

export function deleteSize(sizeId,isActive){
    const request =axios.put(`${URN}/size/` + sizeId,{isActive}, { headers: authHeader() }).then()
    return{
        type:DELETE_SIZE,
        payload:request
    }
}

export function updateSize(sizeId,sizeType){
    const request =axios.put(`${URN}/size/` +sizeId, {
      sizeType
    }, { headers: authHeader() }).then((response)=>{

    })
    return{
        type:UPDATE_SIZE1,
        payload:request
    }
}