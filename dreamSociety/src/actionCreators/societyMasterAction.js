import axios from 'axios';
import{URN,GET_COUNTRY} from '../actions/index';
export function getCountry(){
    console.log('========countryAction========')
    const request=axios.get(`${URN}/country`)
    .then(response=>response.data)
    .catch(error=>console.log('==error==',error))
    return {
        
        type: GET_COUNTRY,
        payload:request
    }
}