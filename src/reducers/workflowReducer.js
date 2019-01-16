const INITIAL_STATE = {
    results: [],
    count: null,
    error: null,
    loading: false
};

const workflowReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_WORKFLOW_SUCCESS':
            return {
                ...state,
                results: action.payload.data,
                count: action.payload.count,
                loading: false
            };
        case 'FETCH_WORKFLOW_REQUEST':
            return {...state, loading: true };
        default:
            return state;
    }
};

const customFieldReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_CUSTOM_FIELD_SUCCESS':
            return {
                ...state,
                results: action.payload.data,
                count: action.payload.count,
                loading: false
            };
        case 'FETCH_CUSTOM_FIELD_REQUEST':
            return {...state, loading: true };
        default:
            return state;
    }
};

const workflowInitStateReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_WORKFLOW_INIT_STATE_SUCCESS':
            return {
                ...state,
                results: action.payload.data,
                count: action.payload.count,
                loading: false
            };
        case 'FETCH_WORKFLOW_INIT_STATE_REQUEST':
            return {...state, loading: true };
        default:
            return state;
    }
};

const departmentReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_DEPARTMENT_SUCCESS':
            return {
                ...state,
                results: action.payload.data,
                count: action.payload.count,
                loading: false
            };
        case 'FETCH_DEPARTMENT_REQUEST':
            return {...state, loading: true };
        default:
            return state;
    }
};

export { workflowReducer, customFieldReducer, workflowInitStateReducer, departmentReducer }
