import {ADD_FLAT_OWNER,GET_FLAT_OWNER,DELETE_MULTIPLE_OWNER,REMOVE_OWNER,UPDATE_OWNER,GET_OWNER_MEMBER,OWNER_MEMBER_DELETE,MEMBER_OWNER_UPDATE,ADD_NEW_MEMBER,GET_ALL_FLOOR,GET_OWNER_FLAT,DELETE_OWNER_FLAT,ADD_MORE_FLATS,EDIT_OWNER_FLAT} from '../../actions/index';

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
        case MEMBER_OWNER_UPDATE:
        return {...state, updateOwnerMember:action.payload}
        case ADD_NEW_MEMBER:
        return {...state, addNewMember:action.payload}
        case GET_ALL_FLOOR:
        return {...state, floor:action.payload}
        case GET_OWNER_FLAT:
        return {...state, flats:action.payload}
        case DELETE_OWNER_FLAT:
        return {...state, deleteFlat:action.payload }
        case ADD_MORE_FLATS:
        return {...state, addMore:action.payload}
        case EDIT_OWNER_FLAT:
        return {...state, updateFlats:action.payload}
        default:
        return state;
    }
}