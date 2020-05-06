import firebase from '../../app/config/firebase';
import cuid from 'cuid';

import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish,
} from '../async/async.actions';
import { toastr } from 'react-redux-toastr';
import { GET_USER_EVENT_BY_KEY, CLEAR_USER_EVENT } from './user.constants';

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
    // let userDoc = await firestore.doc(`/users/${user.uid}`).get();

    // check user  avatar url
    if (!userDoc.data().avatarUrl) {
      await firebase.updateProfile({ avatarUrl: downloadURL });
      await user.updateProfile({ avatarUrl: downloadURL });

      let eventAttendeeRef = firestore
        .collection('event_attendee')
        .where('userUid', '==', user.uid);
      let eventAttendeeSnap = await eventAttendeeRef.get();

      if (!eventAttendeeSnap.empty) {
        const batch = firestore.batch();
        for (let i = 0; i < eventAttendeeSnap.docs.length; i++) {
          let eventDocRef = firestore.doc(
            `/events/${eventAttendeeSnap.docs[i].data().eventId}`
          );
          let eventDocSnap = await eventDocRef.get();

          if (eventDocSnap.exists) {
            batch.update(eventDocRef, {
              hostPhotoURL: downloadURL,
              [`attendees.${user.uid}.photoURL`]: downloadURL,
            });
          }
        }

        await batch.commit();
      }
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
    toastr.success('Success', 'Photo has been uploaded');
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError(err));
    toastr.error('Oops', 'Some thing went wrong');
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
    dispatch(asyncActionStart('deletePhoto', photo.name));
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: 'users',
      doc: user.uid,
      subcollections: [{ collection: 'photos', doc: photo.id }],
    });
    dispatch(asyncActionFinish());
    toastr.success('Success', 'Photo has been deleted');
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError(err));
    toastr.error('Oops', 'Some thing went wrong');
  }
};

export const setMainPhoto = photo => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  const user = firebase.auth().currentUser;
  // const today = new Date();
  const userDocRef = firestore.collection('users').doc(user.uid);
  const eventAttendeesRef = firestore.collection('event_attendee');

  try {
    dispatch(asyncActionStart('setMainPhoto', photo.name));
    const batch = firestore.batch();

    batch.update(userDocRef, {
      avatarUrl: photo.url,
    });
    const eventQuerySnap = await eventAttendeesRef
      .where('userUid', '==', user.uid)
      // .where('eventDate', '<=', today)
      .get();

    for (let i = 0; i < eventQuerySnap.docs.length; i++) {
      let eventDocRef = await firestore
        .collection('events')
        .doc(eventQuerySnap.docs[i].data().eventId);
      let event = await eventDocRef.get();

      if (event.exists) {
        if (event.data().hostUid === user.uid) {
          batch.update(eventDocRef, {
            hostPhotoURL: photo.url,
            [`attendees.${user.uid}.photoURL`]: photo.url,
          });
        } else {
          batch.update(eventDocRef, {
            [`attendees.${user.uid}.photoURL`]: photo.url,
          });
        }
      }
    }

    await batch.commit();
    dispatch(asyncActionFinish());
    toastr.success('Success', 'Your main photo has been changed success');
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError(err));
    toastr.error('Oops', 'Some thing went wrong!');
  }
};

export const updateProfile = profile => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firestore = firebase.firestore();
  const user = firebase.auth().currentUser;
  const userDocRef = firestore.collection('users').doc(user.uid);
  const eventsRef = firestore.collection('events');

  const displayNameEqual =
    getState().firebase.profile.displayName === profile.displayName;

  // const { isLoaded, isEmpty, ...updatedProfile } = profile;

  try {
    dispatch(asyncActionStart());
    const batch = firestore.batch();

    if (!displayNameEqual) {
      const eventsSnap = await eventsRef.where('hostUid', '==', user.uid).get();

      for (let i = 0; i < eventsSnap.docs.length; i++) {
        let eventsDocRef = await firestore
          .collection('events')
          .doc(eventsSnap.docs[i].id);
        let eventsDocSnap = await eventsDocRef.get();

        if (eventsDocSnap.exists) {
          batch.update(eventsDocRef, {
            hostedBy: profile.displayName,
            [`attendees.${user.uid}.displayName`]: profile.displayName,
          });
        }
      }

      batch.update(userDocRef, profile);
    } else {
      batch.update(userDocRef, profile);
    }

    await batch.commit();
    // await firebase.updateProfile(profile);
    dispatch(asyncActionFinish());
    toastr.success('Success', 'User profile has been updated');
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError(err));
    toastr.error('Oops', 'Some thing went wrong');
  }
};

export const getUserEventByKey = (userId, key) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = firebase.firestore();
  const today = Math.round(Date.now() / 1000);
  let eventAttendeeQuery = firestore
    .collection('event_attendee')
    .where('userUid', '==', userId);

  switch (key) {
    case 'tab1':
      break;
    case 'tab2':
      eventAttendeeQuery = eventAttendeeQuery.where('eventDate', '<=', today);
      break;
    case 'tab3':
      eventAttendeeQuery = eventAttendeeQuery.where('eventDate', '>=', today);
      break;
    case 'tab4':
      eventAttendeeQuery = eventAttendeeQuery.where('host', '==', true);
      break;
    default:
      break;
  }

  try {
    dispatch(asyncActionStart());

    const eventAttendeeSnap = await eventAttendeeQuery.get();
    let events = [];

    if (!eventAttendeeSnap.empty) {
      for (let i = 0; i < eventAttendeeSnap.docs.length; i++) {
        let eventDocSnap = await firestore
          .collection('events')
          .doc(eventAttendeeSnap.docs[i].data().eventId)
          .get();

        if (eventDocSnap.exists) {
          events.push({ ...eventDocSnap.data(), id: eventDocSnap.id });
        }
      }
    }

    dispatch(pushUserEventByKey(events));
    dispatch(asyncActionFinish());
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError(err));
  }
};

const pushUserEventByKey = events => ({
  type: GET_USER_EVENT_BY_KEY,
  payload: { events },
});

export const clearUserEvent = () => ({ type: CLEAR_USER_EVENT });

export const followUser = userToFollow => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const profile = getState().firebase.profile;

  const following = {
    displayName: userToFollow.displayName,
    avatarUrl: userToFollow.avatarUrl || '/assets/user.png',
    city: userToFollow.city || 'Unknown City',
  };

  const follower = {
    displayName: profile.displayName,
    avatarUrl: profile.avatarUrl,
    city: profile.city || 'Unknown City',
  };

  try {
    dispatch(asyncActionStart('follow-unFollow'));
    await firestore.set(
      {
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'following', doc: userToFollow.id }],
      },
      following
    );
    await firestore.set(
      {
        collection: 'users',
        doc: userToFollow.id,
        subcollections: [{ collection: 'follower', doc: user.uid }],
      },
      follower
    );

    dispatch(asyncActionFinish());
  } catch (err) {
    console.log(err.message);
    dispatch(asyncActionError(err));
  }
};

export const unFollowUser = userToUnFollow => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;

  try {
    dispatch(asyncActionStart('follow-unFollow'));
    await firestore.delete({
      collection: 'users',
      doc: user.uid,
      subcollections: [{ collection: 'following', doc: userToUnFollow.id }],
    });

    await firestore.delete({
      collection: 'users',
      doc: userToUnFollow.id,
      subcollections: [{ collection: 'follower', doc: user.uid }],
    });

    dispatch(asyncActionFinish());
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError(err));
  }
};
