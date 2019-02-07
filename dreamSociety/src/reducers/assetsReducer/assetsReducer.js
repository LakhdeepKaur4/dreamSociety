import { ADD_ASSETS,GET_ASSETS,UDATE_ASSETS,DELETE_ASSETS } from '../../actions/index';
export default function(state={},action){
    console.log(action.type)
    
    switch(action.type){
        case ADD_ASSETS:
        return {...state,addAssets:action.payload}
        case GET_ASSETS:
        return {...state,AssetsList:action.payload}
        case DELETE_ASSETS:
        return {...state,deleteAssets:action.payload}
        case UDATE_ASSETS:
        return {...state,updateAssets:action.payload}
        default:
        return state;
    }
} 