import {ASSIGN_ROLES, ASSIGN_OWNER, ASSIGN_CHANGES, ASSIGN_POST} from  './../../actions/index';
export default function(state={},action){
  
    switch(action.type){
    case ASSIGN_ROLES:
    return {  ...state, getRoles: action.payload};

    case ASSIGN_OWNER:
    return {  ...state, getOwner: action.payload};

    case ASSIGN_CHANGES:
    return { ...state, getChanges: action.payload};

    case ASSIGN_POST:
    return { ...state, assignPost: action.payload};

    default:
    return state;
}
}