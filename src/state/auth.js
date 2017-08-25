export const Types = {
  LOGIN: 'air-potato/LOGIN',
  LOGOUT: 'air-potato/LOGOUT',
};

export const login = user => ({
  type: Types.LOGIN,
  user,
});

export const logout = () => ({
  type: Types.LOGOUT,
});

export const INITIAL_STATE = {
  user: null,
  isAuthenticated: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case Types.LOGIN:
      newState.user = action.user;
      newState.isAuthenticated = true;
      return newState;
    case Types.LOGOUT:
      newState.user = null;
      newState.isAuthenticated = false;
      return newState;
    default:
      return state;
  }
}
