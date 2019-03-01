export default function(state=[], action){
    switch(action.type){
        case 'GET_TENANT_DETAIL':
            return {...state, getTenantDetail: action.payload}
        default:
            return state
    }
}