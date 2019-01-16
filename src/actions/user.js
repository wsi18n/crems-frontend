import axios from 'axios';
import { message } from 'antd';
import history from '../history';
import { BASE_URL } from '../config/config';

function createUser(postData) {
    return function (dispatch) {
        axios.post(`${BASE_URL}/api/users/`, postData)
            .then((response) => {
                dispatch({
                    type: 'CREATE_USER_SUCCESS',
                    payload: response,
                    loading: false,
                })
                if (response.data.success) {
                    message.info(response.data.msg)
                } else {
                    message.error(response.data.msg)
                }
                history.push('/UserList')
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    history.push('/login')
                }
            })
    }
}

function fetchUser(postData) {
    return function (dispatch) {
        dispatch({
            type: 'FETCH_USER_LIST_REQUEST',
        });
        axios.get(`${BASE_URL}/api/users/`, { params: postData})
            .then((response) => {
                dispatch({
                    type: 'FETCH_USER_LIST_SUCCESS',
                    payload: response,
                    loading: false,
                })
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    history.push('/login')
                }
            })
    }
}

function deleteUser(postData) {
    axios.post(`${BASE_URL}/api/users/user-delete/`, postData)
        .then((response) => {
            if (response.data.success) {
                message.info(response.data.msg)
            } else {
                message.error(response.data.msg)
            }
            history.push('/UserList')
        })
        .catch((error) => {
            if (error.response.status === 401) {
                history.push('/login')
            }
        })
}

export { fetchUser, createUser, deleteUser }