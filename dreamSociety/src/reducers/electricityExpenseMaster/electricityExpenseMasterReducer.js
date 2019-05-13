import { GET_FLOOR_OF_TOWER,GET_ELECTRICITY_EXPENSE } from '../../actions/index';

export default function (state = {}, action) {
    switch(action.type){
        case GET_FLOOR_OF_TOWER:
        return{
            ...state,floorDetails:action.payload
        }
        case GET_ELECTRICITY_EXPENSE:
        return{
            ...state,expenseDetail:action.payload
        }

        default:
        return state
    }
}
