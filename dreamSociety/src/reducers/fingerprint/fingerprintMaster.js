import { GET_FINGERPRINT_DATA, GET_MACHINE_DATA } from '../../actionCreators/index';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_FINGERPRINT_DATA:
            return {
                ...state, fingerprintDetails: action.payload
            }
        case GET_MACHINE_DATA:
            return {
                ...state, machineDetails: action.payload
            }
        default:
            return state
    }
}
