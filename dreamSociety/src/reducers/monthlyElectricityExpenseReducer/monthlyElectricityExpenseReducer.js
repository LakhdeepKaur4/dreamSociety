import { FETCH_EXPENSE_VIA_FLAT,CALCULATE_ELECTRICITY_EXPENSE, URN } from '../../actions';

export default function(state=[],action){
    switch(action.type){
        case FETCH_EXPENSE_VIA_FLAT:
            return {...state, getExpenseDetail:action.payload}
        case CALCULATE_ELECTRICITY_EXPENSE:
            return {...state, getCharges:action.payload}
        default:
            return state;
    }
}