import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

// REDUCER MOUNT POINT
const reducerMountPoint = 'metrics';
// ACTIONS
export const ADD_METRIC_SUCCESS = 'ADD_METRIC_SUCCESS';
// REDUCERS
const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_METRIC_SUCCESS: {
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
    case ADD_METRIC_SUCCESS: {
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
export const addMetric = (organization) => ({
  type: ADD_METRIC_SUCCESS,
  value: organization,
});
const getMetricsIds = state => state[reducerMountPoint].ids;
const getMetricsById = state => state[reducerMountPoint].byId;
export const getMetrics = createSelector(
  [getMetricsIds, getMetricsById],
  (metricsIds, metricsById) => metricsIds.map(id => metricsById[id]),
);
export const getMetric = (state, id) => state[reducerMountPoint].byId[id];
