import { GET_SUB_MAINTENANCE,GET_SUB_MAINTENANCE_DETAILS } from '../../actions';

export default function(state=[], action){
    switch(action.type){
        case GET_SUB_MAINTENANCE:
            return {...state, size: action.payload}
        case GET_SUB_MAINTENANCE_DETAILS:
            return {...state, sizeDetails: action.payload}
        default:
            return state;
    }
}

