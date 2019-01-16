const INITIAL_STATE = {
    results: [],
    loading: false
};

const createTicketRecordReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CREATE_TICKET_RECORD_SUCCESS':
            return {
                ...state,
                results: action.payload.data,
                loading: false
            };
        case 'CREATE_TICKET_RECORD_REQUEST':
            return {...state, loading: true };
        default:
            return state;
    }
};

const ticketRecordReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_TICKET_RECORD_SUCCESS':
            return {
                ...state,
                results: action.payload.data,
                loading: false
            };
        case 'FETCH_TICKET_RECORD_REQUEST':
            return {...state, loading: true };
        default:
            return state;
    }
};

const ticketFlowStepsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_TICKET_FLOW_STEPS_SUCCESS':
            return {
                ...state,
                results: action.payload.data,
                loading: false
            };
        case 'FETCH_TICKET_FLOW_STEPS_REQUEST':
            return {...state, loading: true };
        default:
            return state;
    }
};

const ticketTransitionsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_TICKET_TRANSITIONS_SUCCESS':
            return {
                ...state,
                results: action.payload.data,
                loading: false
            };
        case 'FETCH_TICKET_TRANSITIONS_REQUEST':
            return {...state, loading: true };
        default:
            return state;
    }
};

const ticketCustomFieldsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_TICKET_CUSTOM_FIELDS_SUCCESS':
            return {
                ...state,
                results: action.payload.data,
                loading: false
            };
        case 'FETCH_TICKET_CUSTOM_FIELDS_REQUEST':
            return {...state, loading: true };
        default:
            return state;
    }
};

export { createTicketRecordReducer, ticketRecordReducer,
    ticketFlowStepsReducer, ticketCustomFieldsReducer,
    ticketTransitionsReducer }
