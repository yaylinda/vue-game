import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
    apiKey: "TODO",
    authDomain: "TODO",
    databaseURL: "TODO",
    projectId: "TODO",
    storageBucket: "TODO",
    messagingSenderId: "TODO",
};

firebase.initializeApp(config);

export default firebase;