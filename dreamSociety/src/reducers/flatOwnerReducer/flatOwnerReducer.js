import {ADD_FLAT_OWNER,GET_FLAT_OWNER,DELETE_MULTIPLE_OWNER,REMOVE_OWNER,UPDATE_OWNER,GET_OWNER_MEMBER,OWNER_MEMBER_DELETE} from '../../actions/index';

export default function (state={},action){
    console.log('action.type',action.type)
    console.log('action.paload',action.payload)
    switch(action.type){
        case ADD_FLAT_OWNER:
        return {...state ,ownerList:action.payload}
        case GET_FLAT_OWNER:
        return {...state ,owners:action.payload}
        case DELETE_MULTIPLE_OWNER:
        return {...state ,multiOwners:action.payload}
        case REMOVE_OWNER:
        return {...state ,deleteOwners:action.payload}
        case UPDATE_OWNER:
        return {...state, update:action.payload}
        case GET_OWNER_MEMBER:
        return {...state, ownerMember:action.payload}
        case OWNER_MEMBER_DELETE:
        return {...state, deleteOwnerMember:action.payload}
        default:
        return state;
    }
}