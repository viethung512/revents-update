import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../async/async.actions';
import { closeModal } from '../modal/modal.actions';

export const login = ({ email, password }) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();

  try {
    dispatch(asyncActionStart());
    await firebase.auth().signInWithEmailAndPassword(email, password);
    dispatch(asyncActionFinish());
    dispatch(closeModal());
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError({ message: 'Login fail' }));
  }
};

export const register = ({ displayName, email, password }) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  try {
    dispatch(asyncActionStart());
    const createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await createdUser.user.updateProfile({ displayName });
    const newUser = {
      displayName,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    await firestore.set(`users/${createdUser.user.uid}`, { ...newUser });
    dispatch(asyncActionFinish());
    dispatch(closeModal());
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError(err));
  }
};
