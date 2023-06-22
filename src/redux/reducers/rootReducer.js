import { combineReducers } from 'redux';
import transactionReducer from './transactionReducer.js';

const rootReducer = combineReducers({
    transactionReducer
});

export default rootReducer;