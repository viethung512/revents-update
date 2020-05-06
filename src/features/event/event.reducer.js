import {
  FETCH_EVENTS,
  CLEAR_EVENTS,
  FETCH_EVENT_FINISH,
} from './event.constants';

const eventReducerInitialState = {
  events: [],
  moreEvents: true,
};
const eventReducer = (state = eventReducerInitialState, { type, payload }) => {
  switch (type) {
    case FETCH_EVENTS:
      const newEvents = [...state.events, ...payload.events];

      return {
        ...state,
        events: newEvents,
        moreEvents: true,
      };
    case FETCH_EVENT_FINISH:
      return {
        ...state,
        moreEvents: false,
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
