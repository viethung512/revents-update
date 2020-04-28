import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import authReducer from '../../features/auth/auth.reducer';
import drawerReducer from '../../features/drawer/drawer.reducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  drawer: drawerReducer
});

export default rootReducer;
