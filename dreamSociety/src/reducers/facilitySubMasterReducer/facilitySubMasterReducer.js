import {POST_FACILITY_SUBMASTER,GET_FACILITY_SUBMASTER} from '../../actionCreators/index';
export default function(state={},action){
   
    switch(action.type){

    case POST_FACILITY_SUBMASTER:
    return {  ...state, postFacilty: action.payload};

    case GET_FACILITY_SUBMASTER:
        return {  ...state, getSubFacility: action.payload};

    default:
        return state;
    }
}
