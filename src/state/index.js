import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import examples from '../ducks/examples';
import auth from '../ducks/auth';
import ui from '../ducks/ui';
import organizations from '../ducks/organizations';
import metrics from '../ducks/metrics';
import transactions from '../ducks/transactions';

export function createStore() {
  const rootReducer = combineReducers({
    examples,
    auth,
    ui,
    organizations,
    metrics,
    transactions,
  });

  return configureStore(rootReducer);
}

export default createStore;
