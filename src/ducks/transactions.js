import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import * as fromTransactions from '../apis/transactions';

// REDUCER MOUNT POINT
const reducerMountPoint = 'transactions';
// ACTIONS
export const ADD_TRANSACTION_SUCCESS = 'ADD_TRANSACTION_SUCCESS';
export const CREATE_TRANSACTION_REQUEST = 'CREATE_TRANSACTION_REQUEST';
// REDUCERS
const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_TRANSACTION_SUCCESS: {
      const entry = {};
      entry[action.value.id] = action.value;
      return {
        ...state,
        ...entry,
      };
    }
    default:
      return state;
  }
};
const ids = (state = [], action) => {
  switch (action.type) {
    case ADD_TRANSACTION_SUCCESS: {
      return [...state, action.value.id];
    }
    default:
      return state;
  }
};
export default combineReducers({
  byId,
  ids,
});
export const addTransaction = (transaction) => ({
  type: ADD_TRANSACTION_SUCCESS,
  value: transaction,
});
export const createTransactionRequest = (transaction) => ({
  type: CREATE_TRANSACTION_REQUEST,
  value: transaction,
});
export const createTransaction = transaction => (dispatch) => {
  dispatch(createTransactionRequest(transaction));
  fromTransactions.createTransaction(transaction);
};
const getTransactionsIds = state => state[reducerMountPoint].ids;
const getTransactionsById = state => state[reducerMountPoint].byId;
export const getTransactions = createSelector(
  [getTransactionsIds, getTransactionsById],
  (transactionsIds, transactionsById) => transactionsIds.map(id => transactionsById[id]),
);
export const getTransaction = (state, id) => state[reducerMountPoint].byId[id];
