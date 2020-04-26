import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBwDyQxeVnp9MUs4rsq6FClYoct6tpBwBI',
  authDomain: 'revents-512.firebaseapp.com',
  databaseURL: 'https://revents-512.firebaseio.com',
  projectId: 'revents-512',
  storageBucket: 'revents-512.appspot.com',
  messagingSenderId: '271245886596',
  appId: '1:271245886596:web:7317e840ac83077bab2ed1',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
