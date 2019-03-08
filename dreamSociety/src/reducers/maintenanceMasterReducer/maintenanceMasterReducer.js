import {ADD_MAINTENANCE, GET_MAINTENANCE } from '../../actions/index';
export default function(state={},action){
   
    switch(action.type){

    case ADD_MAINTENANCE:
    return {  ...state, addMaintenance: action.payload};

    case GET_MAINTENANCE:
    return {...state, maintenanceResult: action.payload}




    default:
        return state;
    }
}






