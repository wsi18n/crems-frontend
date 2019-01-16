const initialState = {
    authenticated: false,
    user: {}
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'AUTH_USER':
            return {...state, error: '', authenticated: true, user: action.user };
        case 'UNAUTH_USER':
            return { ...state, error: '', authenticated: false, user: {}};
        case 'AUTH_ERROR':
            return { ...state, error: action.payload};
        case 'FETCH_MESSAGE':
            return { ...state, message: action.payload};
        default:
            return state;
    }
};

export default authReducer;

