import { GET_FLOOR_OF_TOWER } from '../../actions/index';

export default function (state = {}, action) {
    switch(action.type){
        case GET_FLOOR_OF_TOWER:
        return{
            ...state,floorDetails:action.payload
        }
        default:
        return state
    }
}
