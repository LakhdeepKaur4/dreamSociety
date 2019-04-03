import {ADD_VENDOR} from  './../../actions/index';
export default function(state={},action){
  
    switch(action.type){
    case ADD_VENDOR:
    return {  ...state, postVendor: action.payload};

    default:
    return state;
}
}
