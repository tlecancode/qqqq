import { combineReducers } from 'redux';
import queue from './queue';

const rootReducer = combineReducers({
  queue,
});

export default rootReducer;
