import {GET_FLOOR} from '../../actions';

export default function(state=[],action){
    switch(action.type){
        case GET_FLOOR:
        return {...state, floor: action.payload}
        default:{
        return state;
        }
    }
}