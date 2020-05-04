import firebase from '../../app/config/firebase';
import {
  asyncActionError,
  asyncActionStart,
  asyncActionFinish,
} from '../async/async.actions';
import { toastr } from 'react-redux-toastr';
import { createNewEvent } from '../../app/util/helper';
import { closeDrawer } from '../drawer/drawer.actions';

export const createEvent = event => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  const { isLoaded, isEmpty, ...user } = getState().firebase.profile;

  user.uid = firebase.auth().currentUser.uid;

  const photoURL = getState().firebase.profile.avatarUrl;

  const newEvent = createNewEvent(user, photoURL, event);
  try {
    dispatch(asyncActionStart('createEvent'));
    const createdEvent = await firestore.add('events', newEvent);
    await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
      eventId: createdEvent.id,
      userUid: user.uid,
      eventDate: event.date,
      host: true,
    });
    dispatch(asyncActionFinish());
    dispatch(closeDrawer());
    toastr.success('Success', 'Event has been created!');

    return createdEvent;
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError(err));
    toastr.error('Oops', 'Some thing went wrong');
  }
};

export const updateEvent = event => async (dispatch, getState) => {
  const firestore = firebase.firestore();

  try {
    dispatch(asyncActionStart('updateEvent'));

    const eventDocRef = firestore.collection('events').doc(event.id);

    const dateEqual = getState().firestore.ordered.event[0].date === event.date;

    if (!dateEqual) {
      const batch = firestore.batch();
      batch.update(eventDocRef, event);

      const eventAttendeeRef = firestore.collection('event_attendee');
      const eventAttendeeQuerySnap = await eventAttendeeRef
        .where('eventId', '==', event.id)
        .get();

      for (let i = 0; i < eventAttendeeQuerySnap.docs.length; i++) {
        let eventAttendeeDocRef = firestore
          .collection('event_attendee')
          .doc(eventAttendeeQuerySnap.docs[i].id);

        batch.update(eventAttendeeDocRef, {
          eventDate: event.date,
        });
      }

      await batch.commit();
    } else {
      await eventDocRef.update(event);
    }

    dispatch(asyncActionFinish());
    dispatch(closeDrawer());
    toastr.success('Success', 'Your event has been updated');
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError(err));
    toastr.error('Oops', 'Some thing went wrong');
  }
};

export const cancelToggle = (cancelled, eventId) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();

  const confirmMessage = cancelled
    ? 'This will reactivate the event, are you sure?'
    : 'Are you sure you want to cancel this event?';

  try {
    toastr.confirm(confirmMessage, {
      onOk: async () => {
        dispatch(asyncActionStart('cancelToggleEvent'));
        await firestore.update(`/events/${eventId}`, { cancelled: !cancelled });
        dispatch(asyncActionFinish());
        dispatch(closeDrawer());
        toastr.success('Success', 'Your event has been updated');
      },
    });
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError(err));
    toastr.error('Oops', 'Some thing went wrong');
  }
};

export const goingToEvent = event => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  // const firebase = getFirebase();
  const firestore = firebase.firestore();

  const user = firebase.auth().currentUser;
  const profile = getState().firebase.profile;
  const attendee = {
    going: true,
    host: false,
    photoURL: profile.avatarUrl || '/assets/user.png',
    joinDate: new Date(),
    displayName: profile.displayName,
  };

  try {
    dispatch(asyncActionStart('goingToEvent'));
    const batch = firestore.batch();
    const eventDocRef = firestore.collection('events').doc(event.id);
    const eventAttendeeDocRef = firestore
      .collection('event_attendee')
      .doc(`${event.id}_${user.uid}`);

    batch.update(eventDocRef, {
      [`attendees.${user.uid}`]: attendee,
    });

    batch.set(eventAttendeeDocRef, {
      eventId: event.id,
      userUid: user.uid,
      eventDate: event.date,
      host: false,
    });

    await batch.commit();
    dispatch(asyncActionFinish());
    toastr.success('Success', 'You have signed up this event');
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError(err));
    toastr.error('Oops', 'Problem signing up to the event');
  }
};

export const cancelGoingToEvent = event => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  // const firebase = getFirebase();
  const firestore = firebase.firestore();
  const user = firebase.auth().currentUser;
  const eventDocRef = firestore.collection('events').doc(event.id);
  const eventAttendeeDocRef = firestore
    .collection('event_attendee')
    .doc(`${event.id}_${user.uid}`);

  try {
    dispatch(asyncActionStart('cancelGoingToEvent'));
    const batch = firestore.batch();

    batch.update(eventDocRef, {
      [`attendees.${user.uid}`]: firebase.firestore.FieldValue.delete(),
    });

    batch.delete(eventAttendeeDocRef);

    await batch.commit();
    dispatch(asyncActionFinish());
    toastr.success('Success', 'You have removed yourself from the event');
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError(err));
    toastr.error('Oops', 'Problem removing from the event');
  }
};
