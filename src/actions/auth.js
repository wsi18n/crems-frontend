import axios from 'axios';
import history from '../history';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { BASE_URL } from '../config/config';

function signinUser ({username, password}) {
    return function (dispatch) {
        axios.post(`${BASE_URL}/api/auth/`, {username, password})
            .then(response => {
                const token = response.data.token;
                dispatch({type: 'AUTH_USER', user: jwtDecode(token)});
                localStorage.setItem('jwt', token);
                setAuthToken(token);
                history.push('/');
            })
            .catch((error) => {
                dispatch({type: 'AUTH_ERROR', payload: '账号或密码错误！'});
            })
    }
};

function signoutUser() {
    localStorage.removeItem('jwt');
    history.push("/");
    return {type: "UNAUTH_USER"};
};

export { signinUser, signoutUser }
