import axios from 'axios';
import { message } from 'antd';
import history from '../history';
import { BASE_URL } from '../config/config';

function createTicketRecord(postData) {
    return function (dispatch) {
        // dispatch({
        //     type: 'CREATE_TICKET_RECORD_REQUEST',
        // });
        axios.post(`${BASE_URL}/api/ticket/`, postData)
            .then((response) => {
                dispatch({
                    type: 'CREATE_TICKET_RECORD_SUCCESS',
                    payload: response,
                    loading: false,
                })
                if (response.data.success) {
                    message.info(response.data.msg)
                } else {
                    message.error(response.data.msg)
                }
                history.push('/MyTicket')
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    history.push('/login')
                }
            })
    }
}

function fetchTicketRecord(postData) {
    return function (dispatch) {
        dispatch({
            type: 'FETCH_TICKET_RECORD_REQUEST',
        });
        axios.get(`${BASE_URL}/api/ticket/`, { params: postData})
            .then((response) => {
                dispatch({
                    type: 'FETCH_TICKET_RECORD_SUCCESS',
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

function fetchTicketFlowSteps(postData) {
    return function (dispatch) {
        dispatch({
            type: 'FETCH_TICKET_FLOW_STEPS_REQUEST',
        });
        axios.get(`${BASE_URL}/api/ticket/ticket-flow-steps/`, { params: postData})
            .then((response) => {
                dispatch({
                    type: 'FETCH_TICKET_FLOW_STEPS_SUCCESS',
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

function fetchTicketTransitions(postData) {
    return function (dispatch) {
        dispatch({
            type: 'FETCH_TICKET_TRNSITIONS_REQUEST',
        });
        axios.get(`${BASE_URL}/api/ticket/ticket-transitions/`, { params: postData})
            .then((response) => {
                dispatch({
                    type: 'FETCH_TICKET_TRANSITIONS_SUCCESS',
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

function fetchTicketCustomFields(postData) {
    return function (dispatch) {
        dispatch({
            type: 'FETCH_TICKET_CUSTOM_FIELDS_REQUEST',
        });
        axios.get(`${BASE_URL}/api/ticket/ticket-custom-fields/`, { params: postData})
            .then((response) => {
                dispatch({
                    type: 'FETCH_TICKET_CUSTOM_FIELDS_SUCCESS',
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

function handleTicketState(postData) {
    return function (dispatch) {
        axios.post(`${BASE_URL}/api/ticket/handle-ticket-state/`, postData)
            .then((response) => {
                // dispatch({
                //     type: 'CREATE_TICKET_RECORD_SUCCESS',
                //     payload: response,
                //     loading: false,
                // })
                if (response.data.success) {
                    message.info(response.data.msg)
                } else {
                    message.error(response.data.msg)
                }
                history.push('/Todo')
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    history.push('/login')
                }
            })
    }
}

export { createTicketRecord, fetchTicketRecord, fetchTicketFlowSteps,
    fetchTicketTransitions, fetchTicketCustomFields, handleTicketState }