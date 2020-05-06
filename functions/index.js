const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const newActivity = (type, event, id) => ({
  type: type,
  eventDate: event.date,
  hostedBy: event.hostedBy,
  title: event.title,
  photoURL: event.hostPhotoURL,
  timestamp: admin.firestore.FieldValue.serverTimestamp(),
  hostUid: event.hostUid,
  eventId: id,
});

exports.createActivity = functions.firestore
  .document('events/{eventId}')
  .onCreate(event => {
    let newEvent = event.data();

    const activity = newActivity('newEvent', newEvent, event.id);

    return admin
      .firestore()
      .collection('activities')
      .add(activity)
      .then(docRef => console.log('Activity created  with id: ', docRef.id))
      .catch(err => console.log('Error adding activity', err.message));
  });

exports.cancelActivity = functions.firestore
  .document('events/{eventId}')
  .onUpdate((event, context) => {
    const updatedEvent = event.after.data();
    const previousEventData = event.before.data();

    if (
      !updatedEvent.cancelled ||
      updatedEvent.cancelled === previousEventData.cancelled
    ) {
      return false;
    }

    const activity = newActivity(
      'cancelledEvent',
      updatedEvent,
      context.params.eventId
    );

    return admin
      .firestore()
      .collection('activities')
      .add(activity)
      .then(docRef => console.log('Activity created with id: ', docRef.id))
      .catch(err => console.log('Error adding activity', err.message));
  });
