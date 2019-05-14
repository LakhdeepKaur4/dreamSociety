import {GET_COMPLAINTS} from '../../actions/index';

export default function(state={}, action) {

    switch(action.type){
        case GET_COMPLAINTS:
            return {...state, complaints: action.payload}
            
            default:
            return state;
    
    }
    

}