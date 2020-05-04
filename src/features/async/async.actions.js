import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR,
} from './async.constants';

export const asyncActionStart = (actionType = null, elmName = null) => ({
  type: ASYNC_ACTION_START,
  payload: { elmName, actionType },
});

export const asyncActionFinish = () => ({ type: ASYNC_ACTION_FINISH });

export const asyncActionError = error => ({
  type: ASYNC_ACTION_ERROR,
  payload: { error },
});
