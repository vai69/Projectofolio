import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers';
import {logger} from 'redux-logger';



const rootReducer =combineReducers({userReducer});

export const Store =createStore(rootReducer,applyMiddleware(thunk));