import { GET_USER_EVENT_BY_KEY, CLEAR_USER_EVENT } from './user.constants';

const userReducerInitialState = {
  events: [],
};
const userReducer = (state = userReducerInitialState, { type, payload }) => {
  switch (type) {
    case GET_USER_EVENT_BY_KEY:
      return {
        ...state,
        events: payload.events,
      };
    case CLEAR_USER_EVENT:
      return {
        ...state,
        events: [],
      };
    default:
      return state;
  }
};

export default userReducer;
