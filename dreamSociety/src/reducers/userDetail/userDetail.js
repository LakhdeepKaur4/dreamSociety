import { ADD_USER,UPDATE_USER, GET_USERS, GET_ROLES, DELETE_USER } from '../../actions'

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
        case ADD_USER:
            return {...state, users: action.payload}
        case GET_USERS:
            return {...state, user: action.payload}
        case GET_ROLES:
            return {...state, userRole: action.payload}
        case UPDATE_USER:
            return {...state, updatedUser: action.payload}
        case DELETE_USER:
            return {...state, deletedUser: action.payload}
        
        default:
            return state;
    }

}