import{GET_TOWER_NAME,GET_FLAT_TYPE,ADD_FLAT_DETAILS,GET_FLAT_DETAILS,DELETE_FLAT_DETAIL_IDS} from '../../actions/index';

export default function(state={},action){

    switch(action.type){
        case GET_TOWER_NAME:
            return{
                ...state,name:action.payload
            }

        case GET_FLAT_TYPE:
            return{
                ...state, flattype:action.payload
            }

        case ADD_FLAT_DETAILS:
            return{
                ...state, types:action.payload
            }

        case GET_FLAT_DETAILS:
            return{
                ...state, details:action.payload
            }    
                     
        case DELETE_FLAT_DETAIL_IDS:
            return{
                ...state, delete: action.payload
            }
            default:
            return state
    }
}