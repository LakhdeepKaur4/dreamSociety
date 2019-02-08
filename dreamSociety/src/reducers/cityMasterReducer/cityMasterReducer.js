import {COUNTRY_DETAIL,STATE_DETAIL, CITY_DETAIL, ADD_CITY, DETAIL_CITY, DELETE_CITY,UPDATE_CITY} from  './../../actions/index';
export default function(state={},action){
    console.log('=============societyReducer===========',action.payload);
    switch(action.type){
    case COUNTRY_DETAIL:
    return {  ...state, countryResult: action.payload};

      
    case STATE_DETAIL:
    return {  ...state, stateResult: action.payload};

    case CITY_DETAIL:
    return {  ...state, cityResult: action.payload};

    
    case ADD_CITY:
    return {...state, cityData: action.payload};

    case DETAIL_CITY:
    return {...state, city: action.payload}

    case DELETE_CITY:
    return {...state, delete_city: action.payload}
   
    case UPDATE_CITY:
    return {...state, update_city: action.payload}
   

    default:
        return state;
    }
}