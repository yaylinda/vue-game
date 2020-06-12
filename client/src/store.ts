import firebase from 'firebase/app';
import 'firebase/firestore';
import {FIRESTORE_COLLECTIONS} from './constants';

const config = {
    apiKey: "TODO",
    authDomain: "TODO",
    databaseURL: "TODO",
    projectId: "TODO",
    storageBucket: "TODO",
    messagingSenderId: "TODO",
};

firebase.initializeApp(config);

// Initialize store and fields
const store = {

};

// Firestore Collections

const vueGameCookiesCollection = firebase
    .firestore()
    .collection(FIRESTORE_COLLECTIONS.VUE_GAME_COOKIES);

// vueGameCookiesCollection.onSnapshot((ref) => {
//     const cookies: any[] = [];
//     ref.forEach((doc) => {
//         cookies.push(doc.data());
//     });
//     store.vueGameCookies = cookies;
// });

