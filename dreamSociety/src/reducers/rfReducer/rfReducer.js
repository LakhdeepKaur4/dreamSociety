import { ADD_RF,GET_RF} from '../../actions/index';
export default function(state={},action){    
    switch(action.type){
        case ADD_RF:
        return {...state,addRF:action.payload}
        case GET_RF:
        return {...state,rfList:action.payload}
        default:
        return state;
    }
} 