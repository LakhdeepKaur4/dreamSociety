import {ADD_VENDOR_MASTER,GET_VENDOR_MASTER,GET_RATE_TYPE} from '../../actions/index';

export default function(state={}, action) {

    switch(action.type){
        case ADD_VENDOR_MASTER:
            return {...state, vendor: action.payload} 
            
        case GET_VENDOR_MASTER:
            return {...state, vendors: action.payload}
        
        case GET_RATE_TYPE:
            return {...state, rate: action.payload}    
            
        default:
            return state;
    
    }
    

}