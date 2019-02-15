import axios from 'axios'
import { URN, GET_ASSETS, UPDATE_ASSETS_SUB,ADD_ASSETS_TYPE, GET_ASSETS_SUB, REMOVE_ASSETS_SUB } from '../actions/index';
import { authHeader } from '../helper/authHeader';

export function getAssets() {

    const request = axios.get(`${URN}/assets/`, { headers: authHeader() })
        .then(response => response.data)

    return {
        type: GET_ASSETS,
        payload: request
    }
}

export function addAssetsSubType(addAssetsSubType, description, assetsId) {
    const data = {
        assetId: assetsId,
        assetType: addAssetsSubType,
        description: description
    }
 
    const request = axios.post(`${URN}/assetsType/`, data, { headers: authHeader() })
        .then(response => response.data)
    return {
        type: ADD_ASSETS_TYPE,
        payload: request
    }

}

export function fetchAssets() {
    const request = axios.get(`${URN}/assetsType/`, { headers: authHeader() })
        .then(response => response.data)
    return {
        type: GET_ASSETS_SUB,
        payload: request
    }
}

export function updateAssetsSub(id, assetName, description) {
    const data = {
        assetTypeId: id,
        assetType: assetName,
        description: description,
    }
    
    const request = axios.put(`${URN}/assetsType/${id}`, data, { headers: authHeader() })
        .then(response => response.data)
       
    return {
        type: UPDATE_ASSETS_SUB,
        payload: request
    }
}
export function removeAssetsSub(id) {
   
    const data = {
        assetTypeId: id,
        isActive: false
    }
    const request = axios.put(`${URN}/assetsType/delete/` + id, data, { headers: authHeader() })
        .then(reponse => reponse.data)

    return {
        type: REMOVE_ASSETS_SUB,
        payload: request
    }
}
