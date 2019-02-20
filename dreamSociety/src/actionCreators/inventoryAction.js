import axios from 'axios'
import { URN, ADD_INVENTORY, GET_INVENTORY, UPDATE_INVENTORY, REMOVE_INVENTORY, DELETE_MULTIPLE_INVENTORY } from '../actions/index';
import { authHeader } from '../helper/authHeader';

export function addInventory(assetId, assetTypeId, number, rate, serialNumber) {
    const data = {
        assetId,
        assetTypeId,
        number,
        rate,
        serialNumber
    }
    const request = axios.post(`${URN}/inventory/`, data, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => error)
    return {
        type: ADD_INVENTORY,
        payload: request
    }

}
export function getInventory() {
    const request = axios.get(`${URN}/inventory/`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => error)
    return {
        type: GET_INVENTORY,
        payload: request
    }
}

export function updateInventory(assetId, inventoryId, serial, ratePerInventory, assetType, numberOfInventory) {
    const data = {
        assetId: assetId,
        inventoryId: inventoryId,
        serialNumber: serial,
        rate: ratePerInventory,
        assetTypeId: assetType,
        number: numberOfInventory
    }
    const request = axios.put(`${URN}/inventory/${inventoryId}`, data, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => error)
    return {
        type: UPDATE_INVENTORY,
        payload: request
    }
}

export function removeInventory(inventoryId) {
    const data = {
        isActive: false
    }
    const request = axios.put(`${URN}/inventory/delete/${inventoryId}`, data, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => error)
    return {
        type: REMOVE_INVENTORY,
        payload: request
    }
}

export function multipleDelete(ids) {
    const request = axios.put(`${URN}/inventory/delete/deleteSelected `, { ids }, { headers: authHeader() })
        .then(response => response.data)
        .then(error => error)
    return {
        type: DELETE_MULTIPLE_INVENTORY,
        payload: request
    }
}