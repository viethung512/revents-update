import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

// connect firestore config
import firebase from '../config/firebase';
import { getFirebase, createFirebaseInstance } from 'react-redux-firebase';
import {
  getFirestore,
  createFirestoreInstance,
  reduxFirestore,
} from 'redux-firestore';

const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false,
};

const configureStore = () => {
  const middleware = [thunk.withExtraArgument({ getFirebase, getFirestore })];
  const composerEnhancer = composeWithDevTools(
    applyMiddleware(...middleware),
    reduxFirestore(firebase)
  );

  const store = createStore(rootReducer, composerEnhancer);

  return store;
};

export const store = configureStore();

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
  createFirebaseInstance,
};
