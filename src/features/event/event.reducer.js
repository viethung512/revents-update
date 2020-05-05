import { FETCH_EVENTS, CLEAR_EVENTS } from './event.constants';

const eventReducerInitialState = {
  events: [],
};
const eventReducer = (state = eventReducerInitialState, { type, payload }) => {
  switch (type) {
    case FETCH_EVENTS:
      return {
        ...state,
        events: payload.events,
      };
    case CLEAR_EVENTS:
      return {
        ...state,
        events: [],
      };
    default:
      return state;
  }
};

export default eventReducer;
