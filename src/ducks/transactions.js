import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

// REDUCER MOUNT POINT
const reducerMountPoint = 'transactions';
// ACTIONS
export const ADD_TRANSACTION_SUCCESS = 'ADD_TRANSACTION_SUCCESS';
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
export const addTransaction = (organization) => ({
  type: ADD_TRANSACTION_SUCCESS,
  value: organization,
});
const getTransactionsIds = state => state[reducerMountPoint].ids;
const getTransactionsById = state => state[reducerMountPoint].byId;
export const getTransactions = createSelector(
  [getTransactionsIds, getTransactionsById],
  (transactionsIds, transactionsById) => transactionsIds.map(id => transactionsById[id]),
);
