import {ADD_FLAT_OWNER,GET_FLAT_OWNER} from '../../actions/index';

export default function (state={},action){
    console.log('7777777777777777777777777777777',action)
    switch(action.type){
        case ADD_FLAT_OWNER:
        return {...state ,ownerList:action.payload}
        case GET_FLAT_OWNER:
        return {...state ,owners:action.payload}
        default:
        return state;
    }
}