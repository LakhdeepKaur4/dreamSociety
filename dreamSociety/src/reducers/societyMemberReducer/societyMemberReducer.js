import { GET_SOCIETY_MEMBER_DESIGNATION_DETAIL, GET_SOCIETY_MEMBER_DETAILS,GET_SOCIETY_ID } from '../../actions';

export default function(state=[], action) {
    switch(action.type){
        case GET_SOCIETY_MEMBER_DESIGNATION_DETAIL:
            return {...state, designation: action.payload}
        case GET_SOCIETY_MEMBER_DETAILS:
            return {...state, memberDetails: action.payload}
            case GET_SOCIETY_ID:
            return {...state, societyId: action.payload}
        default: return state;
    }
}