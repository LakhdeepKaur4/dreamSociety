// import {} from '../constants/index'
export default function(state={}, action){
    console.log("========Login reducers=======",action.paylaod)
    switch(action.type){
        case 'USER_LOGIN':
            return {...state,error:action.payload};                                                                             
        default:
            return state;
    }
} 