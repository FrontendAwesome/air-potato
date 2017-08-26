import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

// REDUCER MOUNT POINT
const reducerMountPoint = 'organizations';
// ACTIONS
export const ADD_ORGANIZATION_SUCCESS = 'ADD_ORGANIZATION_SUCCESS';
// REDUCERS
const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_ORGANIZATION_SUCCESS: {
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
    case ADD_ORGANIZATION_SUCCESS: {
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
export const addOrganization = (organization) => ({
  type: ADD_ORGANIZATION_SUCCESS,
  value: organization,
});
const getOrganizationsIds = state => state[reducerMountPoint].ids;
const getOrganizationsById = state => state[reducerMountPoint].byId;
export const getOrganizations = createSelector(
  [getOrganizationsIds, getOrganizationsById],
  (organizationsIds, organizationsById) => organizationsIds.map(id => organizationsById[id]),
);
export const getOrganization = (state, id) => state[reducerMountPoint].byId[id];
