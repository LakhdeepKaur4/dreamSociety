import {POST_FACILITY_SUBMASTER} from '../../actionCreators/index';
export default function(state={},action){
   
    switch(action.type){

    case POST_FACILITY_SUBMASTER:
    return {  ...state, postFacilty: action.payload};

    default:
        return state;
    }
}
