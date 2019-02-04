import {GET_COUNTRY} from '../../actions/index';
export default function(state={},action){
    // console.log('=============societyReducer===========',action.payload);
    switch(action.type){
    case GET_COUNTRY:
    return {...state,country:action.payload};                                                                             
    default:
        return state;
    }
}