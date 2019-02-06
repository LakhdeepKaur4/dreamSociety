import{GET_TOWER_NAME,GET_FLAT_TYPE,ADD_FLAT_DETAILS,GET_FLAT_DETAILS} from '../../actions/index';

export default function(state={},action){

    switch(action.type){
        case GET_TOWER_NAME:
            return{
                ...state,name:action.payload
            }

        case GET_FLAT_TYPE:
            return{
                ...state, type:action.payload
            }

        case ADD_FLAT_DETAILS:
            return{
                ...state, types:action.payload
            }

        case GET_FLAT_DETAILS:
            return{
                ...state, details:action.payload
            }    
                     
            default:
            return state
    }
}