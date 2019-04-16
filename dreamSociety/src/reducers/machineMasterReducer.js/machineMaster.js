import {GET_MACHINE,ADD_MACHINE} from '../../actions/index'


export default  function(state=[],action){
    switch(action.type){
      
        case ADD_MACHINE:
            return{...state, Add_machine:action.payload}
            case GET_MACHINE:
            return{...state,machine:action.payload}
        default :
         return state
    }
}