import {GET_OWNER_DETAIL_VIA_FLATID} from '../../actions'
export default function(state=[], action){
    switch(action.type){
        case GET_OWNER_DETAIL_VIA_FLATID:
            return {...state, getOwnerDetail: action.payload}
        default:
            return state;
    }
}