import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { workflowReducer, customFieldReducer, workflowInitStateReducer, departmentReducer }from './workflowReducer';
import { createTicketRecordReducer, ticketRecordReducer,
    ticketFlowStepsReducer, ticketTransitionsReducer,
    ticketCustomFieldsReducer } from './ticketReducer';
import { userListReducer, createUserReducer, deleteUserReducer } from './userReducer';

const rootReducer = combineReducers({
    authReducer,
    workflowReducer,
    customFieldReducer,
    workflowInitStateReducer,
    departmentReducer,
    createTicketRecordReducer,
    ticketRecordReducer,
    ticketFlowStepsReducer,
    ticketTransitionsReducer,
    ticketCustomFieldsReducer,
    userListReducer,
    createUserReducer,
    deleteUserReducer
});

export default rootReducer;
