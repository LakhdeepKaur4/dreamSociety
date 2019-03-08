import {GET_OWNER_DETAIL_VIA_FLATID,GET_FLAT_DETAIL_VIA_TOWERID} from '../../actions'
export default function(state=[], action){
    switch(action.type){
        case GET_FLAT_DETAIL_VIA_TOWERID:
            return {...state, getFlatDetail: action.payload}
        case GET_OWNER_DETAIL_VIA_FLATID:
            return {...state, getOwnerDetail: action.payload}
        default:
            return state;
    }
}