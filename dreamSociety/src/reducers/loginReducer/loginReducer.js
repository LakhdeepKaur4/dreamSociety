import {USER_LOGIN} from '../../actions/index'
export default function(state={}, action){
    switch(action.type){
        case USER_LOGIN:
            return {...state,error:action.payload};                                                                              
        default:
            return state;
    }
} 