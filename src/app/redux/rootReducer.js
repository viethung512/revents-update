import { combineReducers } from 'redux';
import authReducer from '../../features/auth/auth.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
