import {GET_DETAIL,ADD_SERVICE} from '../../actions/index';

export default function(state={}, action) {

    switch(action.type){
        case ADD_SERVICE:
            return {...state, services: action.payload}
            
        case GET_DETAIL:
            return {...state, detail: action.payload}    
        default:
            return state;
    
    }
    

}