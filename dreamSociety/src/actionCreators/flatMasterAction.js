import axios from 'axios';
import { authHeader } from '../helper/authHeader';
import {URN,GET_DETAILS,FETCH_DETAILS,FETCH_DROP,FETCH_SIZE_DROP,FETCH_SOCIETY_DROP,FETCH_SIZEMASTER_DROP,
    GET_ACTIVE_PAGE,GET_COUNT_PAGE,GET_QR} from '../actions/index';


export  function AddDetails(values){
  
    const request= axios.post(`${URN}/flat/`,values,{headers:authHeader()})
    .then(response => response.data)
    .then(getDetails())
    // .then(getDetails())
 
    // this.setState({flatId:response,flatType:response,flatSize:response})
    // console.log(request)
    
    return{
        type:GET_DETAILS,
        payload:request
    }

}

export  function getDetails(defaultPage){
    console.log(defaultPage);

    const request = axios.get(`${URN}/flat/${defaultPage}`,{headers:authHeader()})
    .then(response => response.data)
   
    return{

         type:FETCH_DETAILS,
         payload: request 
    }

}

export function getPageDetails(activePage){
     console.log(activePage);
     const request = axios.get(`${URN}/flat/${activePage}`,{headers:authHeader()})
     .then(response => response.data)

     return{
         type:GET_ACTIVE_PAGE,
         payload:request
     }
}

export function noOfCount(countPerPage,activePage){
    console.log("InAction",countPerPage,activePage);
    const request= axios.get(`http://192.168.1.101:5000/flat/${activePage}/${countPerPage}/`,{headers:authHeader()})
    .then(response => console.log(response.data))

    return{
        type:GET_COUNT_PAGE,
        payload:request
    }
}

export  function getDrop(){

    const request = axios.get(`${URN}/society`,{headers:authHeader()})
    .then(response => response.data)
   
    return{

         type:FETCH_DROP,
         payload: request 
    }

}

export  function getSizeDrop(){

    const request = axios.get(`${URN}/size/`,{headers:authHeader()})
    .then(response => response.data)

    return{

         type:FETCH_SIZE_DROP,
         payload: request 
    }

}

export  function getSocietyNameDetails(){

    const request = axios.get(`${URN}/society`,{headers:authHeader()})
    .then(response => response.data)
   
    return{

         type:FETCH_SOCIETY_DROP,
         payload: request 
    }

}

export  function getSizeTypeDetails(){

    const request = axios.get(`${URN}/size/`,{headers:authHeader()})
    .then(response => response.data)
   
    return{

         type:FETCH_SIZEMASTER_DROP,
         payload: request 
    }

}
// export  function getQr(){
 
//     const request = axios.get(`${URN}/user/10`,{headers:authHeader()})
//     .then(response => response.data)
   
//     return{

//          type: GET_QR,
//          payload: request 
//     }

// }
// export  function deleteEntry(id){

//     const request = axios.delete(`${URL_ROOT}/flatsIndex/` +id)
//     .then(response => response.data)
   
//     return{

//          type:'DELETE_DETAILS',
//          payload: request 
//     }

// }