import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR,
} from './async.constants';

const asyncReducerInitialState = {
  loading: false,
  elementName: null,
  error: null,
};

const asyncReducer = (state = asyncReducerInitialState, { type, payload }) => {
  switch (type) {
    case ASYNC_ACTION_START:
      return {
        ...state,
        loading: true,
        elementName: payload,
        error: null,
      };
    case ASYNC_ACTION_FINISH:
      return {
        ...state,
        loading: false,
        elementName: null,
        error: null,
      };
    case ASYNC_ACTION_ERROR:
      return {
        ...state,
        loading: false,
        elementName: null,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default asyncReducer;
