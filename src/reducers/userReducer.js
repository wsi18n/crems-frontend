const INITIAL_STATE = {
    results: [],
    loading: false
};

const userListReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_USER_LIST_SUCCESS':
            return {
                ...state,
                results: action.payload.data,
                loading: false
            };
        case 'FETCH_USER_LIST_REQUEST':
            return {...state, loading: true };
        default:
            return state;
    }
};

const createUserReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CREATE_USER_SUCCESS':
            return {
                ...state,
                results: action.payload.data,
                loading: false
            };
        case 'CREATE_USER_REQUEST':
            return {...state, loading: true };
        default:
            return state;
    }
};

const deleteUserReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'DELETE_USER_SUCCESS':
            return {
                ...state,
                results: action.payload.data,
                loading: false
            };
        case 'DELETE_USER_REQUEST':
            return {...state, loading: true };
        default:
            return state;
    }
};


export { userListReducer, createUserReducer,
    deleteUserReducer }
