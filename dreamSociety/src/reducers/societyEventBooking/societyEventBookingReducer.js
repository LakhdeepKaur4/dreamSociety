import {ADD_SOCIETY_EVENTS,GET_SOCIETY_EVENTS,UPDATE_SOCIETY_EVENTS} from '../../actions/index';


export default function(state={}, action) {

    switch(action.type){
        case ADD_SOCIETY_EVENTS:
            return {...state, addSocietyEvents: action.payload}
            
        case GET_SOCIETY_EVENTS:
            return {...state, societyEvents: action.payload}
            
        case UPDATE_SOCIETY_EVENTS:
             return {...state, updateSociety: action.payload}
            default:
            return state;
    
    }
    

}