import {GET_FLOOR} from '../../actions/index';

export default function (state={},action){

    switch(action.type){
        case GET_FLOOR:
        return {...state,floorDetails:action.payload}
        default:
        return state;
    }

}