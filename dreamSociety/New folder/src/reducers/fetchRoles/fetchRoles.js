import {GET_ROLES} from '../constants/index'
const initialState = {
    users: {
        id: ''
    }
}

export default function(state=[], action) {
    if(typeof state === 'undefined') {
        return initialState
    }
    switch(action.type){
        case GET_ROLES:
            return {...state, roles: action.payload}
        default:
            return state;
    }

}