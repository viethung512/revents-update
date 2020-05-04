import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import authReducer from '../../features/auth/auth.reducer';
import drawerReducer from '../../features/drawer/drawer.reducer';
import modalReducer from '../../features/modal/modal.reducer';
import asyncReducer from '../../features/async/async.reducer';
import { reducer as toastrReducer } from 'react-redux-toastr';
import userReducer from '../../features/user/user.reducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  drawer: drawerReducer,
  modal: modalReducer,
  async: asyncReducer,
  toastr: toastrReducer,
  user: userReducer,
});

export default rootReducer;
