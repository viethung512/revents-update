import cuid from 'cuid';

import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish,
} from '../async/async.actions';

export const uploadProfileImage = (file, filename) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const imageName = cuid();
  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images/`;
  const options = { name: imageName };

  try {
    dispatch(asyncActionStart());

    let uploadedFile = await firebase.uploadFile(path, file, null, options); // upload file to firebase storage
    let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL(); // get url after upload

    let userDoc = await firestore.get(`/users/${user.uid}`);

    // check user  avatar url
    if (!userDoc.data().avatarUrl) {
      await firebase.updateProfile({ avatarUrl: downloadURL });
      await user.updateProfile({ avatarUrl: downloadURL });
    }

    // add image to firestore
    await firestore.add(
      {
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos' }],
      },
      { name: imageName, url: downloadURL }
    );
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError(err));
  }
};

export const deletePhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;

  try {
    dispatch(asyncActionStart());
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: 'users',
      doc: user.uid,
      subcollections: [{ collection: 'photos', doc: photo.id }],
    });
    dispatch(asyncActionFinish());
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError(err));
  }
};
