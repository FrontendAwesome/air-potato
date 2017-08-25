import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import auth from './auth';

export function createStore() {
  const rootReducer = combineReducers({
    auth,
  });

  return configureStore(rootReducer);
}

export default createStore;
