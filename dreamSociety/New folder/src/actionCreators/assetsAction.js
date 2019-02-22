import axios from 'axios'
import { URN, ADD_ASSETS,GET_ASSETS,UDATE_ASSETS,REMOVE_ASSETS } from '../actions/index';
import { authHeader } from '../helper/authHeader';

export function addAssets(assets, description) {
    const data={
        assetName:assets,
        description:description
    }
    const request = axios.post(`${URN}/assets/`, data , { headers: authHeader() })
        .then(response => response.data)

    return {
        type: ADD_ASSETS,
        payload: request
    }

}

export function getAssets(){
    const request=axios.get(`${URN}/assets/`,{headers:authHeader()})
    .then(response=>response.data)

    return {
        type:GET_ASSETS,
        payload:request
    }
}

export function updateAssets(id,assetName,description){
    const data={
        assetName,
        description
    }
    const request=axios.put(`${URN}/assets/`+id,data,{headers:authHeader()})
    .then(response=>response.data)

    return{
        type:UDATE_ASSETS,
        payload:request
    }

 }

export function removeAssets(id){
    console.log('remove assets', id)
    const data={
        assetsId:id,
        isActive:false
    }
    const request=axios.put(`${URN}/assets/delete/`+id,data,{headers:authHeader()})
    .then(reponse=>reponse.data)

    return{
        type:REMOVE_ASSETS,
        payload:request
    }
}