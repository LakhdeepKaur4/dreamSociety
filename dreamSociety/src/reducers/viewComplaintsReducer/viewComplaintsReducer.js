import {GET_COMPLAINTS,REJECT_COMPLAINT,ACCEPT_COMPLAINT,SEND_COMPLAINT,COMPLAINT_COMPLETE} from '../../actions/index';

export default function(state={}, action) {

    switch(action.type){
        case GET_COMPLAINTS:
            return {...state, complaints: action.payload}

        case REJECT_COMPLAINT:
            return {...state, rejectComplaint: action.payload}

        case ACCEPT_COMPLAINT:
            return {...state, acceptComplaint: action.payload}   
             
        case SEND_COMPLAINT:
            return {...state, sendComplaint: action.payload}

        case COMPLAINT_COMPLETE:
            return {...state, complaintComplete: action.payload}

            default:
            return state;
    
    }
    

}