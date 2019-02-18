import axios from 'axios';
import{URN,USER_LOGIN} from '../actions/index';
export function login(username, password) {
    const request = axios({
        method: 'post',
        url: `${URN}/auth/signin`,
        data: {
            userName: username,
            password:  password
        }
      });
         
    return {
        type: USER_LOGIN,
        payload: request
    }
}
export function userLogout() {
    console.log('logout function')
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('user-type');
    return this.history.go('/')

}



