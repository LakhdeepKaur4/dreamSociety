import {CHANGE_PASSWORD} from  './../../actions/index';
export default function(state={},action){
  
    switch(action.type){
    case CHANGE_PASSWORD:
    return {  ...state, password: action.payload};

    default:
    return state;
}
}
