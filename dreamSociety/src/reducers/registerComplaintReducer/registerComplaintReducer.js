import {REGISTER_COMPLAINT} from  './../../actions/index';
export default function(state={},action){
  
    switch(action.type){
    case REGISTER_COMPLAINT:
    return {  ...state, register: action.payload};

    default:
    return state;
}
}
