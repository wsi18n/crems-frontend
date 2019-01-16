import axios from 'axios';
import history from '../history';
import { BASE_URL } from '../config/config';

function fetchWorkflow(postData) {
    return function (dispatch) {
        dispatch({
            type: 'FETCH_WORKFLOW_REQUEST',
        });
        axios.get(`${BASE_URL}/api/workflow/`, { params: postData})
            .then((response) => {
                dispatch({
                    type: 'FETCH_WORKFLOW_SUCCESS',
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

function fetchCustomField(postData) {
    return function (dispatch) {
        dispatch({
            type: 'FETCH_CUSTOM_FIELD_REQUEST',
        });
        axios.get(`${BASE_URL}/api/workflow/custom-field`, { params: postData})
            .then((response) => {
                dispatch({
                    type: 'FETCH_CUSTOM_FIELD_SUCCESS',
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

function fetchWorkflowInitState(postData) {
    return function (dispatch) {
        dispatch({
            type: 'FETCH_WORKFLOW_INIT_STATE_REQUEST',
        });
        axios.get(`${BASE_URL}/api/workflow/workflow-init-state/`, { params: postData})
            .then((response) => {
                dispatch({
                    type: 'FETCH_WORKFLOW_INIT_STATE_SUCCESS',
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

function fetchDepartment(postData) {
    return function (dispatch) {
        dispatch({
            type: 'FETCH_DEPARTMENT_REQUEST',
        });
        axios.get(`${BASE_URL}/api/users/department/`, { params: postData})
            .then((response) => {
                dispatch({
                    type: 'FETCH_DEPARTMENT_SUCCESS',
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

export { fetchWorkflow, fetchCustomField, fetchWorkflowInitState, fetchDepartment }