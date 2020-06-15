import 'firebase/firestore';
import firebase from 'firebase/app';

export const db = firebase
  .initializeApp({
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  })
  .firestore();
