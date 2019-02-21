import {ADD_EMP,GET_EMP} from '../../actions/index'

  export default function(state={}, action){
      switch(action.type){

          case ADD_EMP:
          return {...state,employee:action.payload}
          case GET_EMP:
          return {...state,getEmployee:action.payload}
         
           default: 
           return state;
      }
  }