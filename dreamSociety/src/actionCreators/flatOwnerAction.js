import axios from 'axios'
import { URN,ADD_FLAT_OWNER } from '../actions/index';
import { authHeader } from '../helper/authHeader';

export function addFlatOwner(data){
    console.log('hughjgjhgjjlkl;k;',...data)
    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
const request=axios.post(`${URN}/owner`,data,{ headers: authHeader() },config)
.then(response=>response.data)
return {
    type:ADD_FLAT_OWNER,
    payload:request
}
}