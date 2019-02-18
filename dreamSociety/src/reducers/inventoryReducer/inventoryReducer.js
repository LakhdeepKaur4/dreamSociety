import {ADD_INVENTORY,GET_INVENTORY,UPDATE_INVENTORY,REMOVE_INVENTORY} from '../../actions/index';

export default function(state={},action){
    console.log(action.type)
    switch(action.type){
        case ADD_INVENTORY:
        return {...state,addInventory:action.payload}
        case GET_INVENTORY :
        return {...state,getInventory:action.payload}
        case UPDATE_INVENTORY :
        return {...state,update:action.payload}
        case REMOVE_INVENTORY :
        return {...state,delete:action.payload}
        default :
        return state;
    }

}