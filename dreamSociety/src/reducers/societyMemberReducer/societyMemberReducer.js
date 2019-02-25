import { GET_SOCIETY_MEMBER_DESIGNATION_DETAIL } from '../../actions';

export default function(state=[], action) {
    switch(action.type){
        case GET_SOCIETY_MEMBER_DESIGNATION_DETAIL:
            return {...state, designation: action.payload}
        default: return state;
    }
}