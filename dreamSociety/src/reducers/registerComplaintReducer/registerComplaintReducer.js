import {REGISTER_COMPLAINT, USER_FLAT_DETAILS,POST_REGISTER_COMPLAINT} from  './../../actions/index';
export default function(state={},action){
  
    switch(action.type){
    case REGISTER_COMPLAINT:
    return {  ...state, register: action.payload};

    case USER_FLAT_DETAILS:
    return {  ...state, userFlat: action.payload};

    case POST_REGISTER_COMPLAINT:
    return {  ...state, postComplaint: action.payload};

    default:
    return state;
}
}
