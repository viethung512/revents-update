import { LOGIN, LOGOUT } from './auth.constants';

const authReducerInitialState = {
  authenticated: false,
};

const authReducer = (state = authReducerInitialState, { type }) => {
  switch (type) {
    case LOGIN:
      return {
        ...state,
        authenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        authenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
