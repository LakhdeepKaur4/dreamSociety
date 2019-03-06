import {ADD_FLAT_OWNER} from '../../actions/index';

export default function (state={},action){
    switch(action.type){
        case ADD_FLAT_OWNER:
        return {...state ,ownerList:action.payload}
        default:
        return state;
    }
}