import {authHeader} from '../helper/authHeader'
import axios from 'axios';
import {URN,ADD_TOWER,GET_TOWER}  from '../actions/index' 


export  default function AddTower(values){
    const request = axios.post(`${URN}/tower`,values,{headers:authHeader()},
     {method: 'POST'})
    .then()
   console.log(request);
   
    return{
        type:  ADD_TOWER,
        payload: request
    }
}


export function viewTower(){
const request  = fetch(`${URN}/tower`,  {headers:authHeader()},{method: 'GET'})
.then(response => response.json())
return{
      type: GET_TOWER,
      payload: request
}
}