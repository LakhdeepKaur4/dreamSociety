import {GET_COUNTRY_NAME,GET_STATE_NAME,GET_CITY_NAME, ADD_LOCATION_DETAILS,GET_LOCATION_NAME,GET_LOCATION} from '../../actions/index';

export default function(state={},action){

    switch(action.type){
        case GET_COUNTRY_NAME:
            return{
                ...state,country:action.payload
            }
        
        
        case GET_STATE_NAME:
            return{
                ...state, stateResult:action.payload
            }
            
        case GET_CITY_NAME:
            return{
                ...state, city:action.payload
            }

        case GET_LOCATION_NAME:
            return{
                ...state, location:action.payload
            }    

        case  ADD_LOCATION_DETAILS:
            return{
                ...state, add:action.payload
            }    

        case  GET_LOCATION:
            return{
                ...state, details:action.payload
            }  

        default:
            return state
    }
}