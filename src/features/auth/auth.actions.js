import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../async/async.actions';
import { closeModal } from '../modal/modal.actions';
import { toastr } from 'react-redux-toastr';

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
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await createdUser.user.updateProfile({
      displayName: displayName,
    });
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

export const socialLogin = selectedProvider => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();

  try {
    dispatch(closeModal());
    await firebase.login({
      provider: selectedProvider,
      type: 'popup',
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePassword = credential => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;

  try {
    dispatch(asyncActionStart());

    await user.updatePassword(credential.newPassword);

    dispatch(asyncActionFinish());
    toastr.success('Success', 'Your password has been updated');
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError(err));
    toastr.error('Oops', 'Some thing went wrong');
  }
};
