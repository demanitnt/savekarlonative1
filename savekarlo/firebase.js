import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
const fire = firebase.initializeApp({
    apiKey: "AIzaSyDTknd8EXtk9lht8mXZvz5hAjs5C8Vppac",
    authDomain: "savekarlo-1f6ea.firebaseapp.com",
    projectId: "savekarlo-1f6ea",
    storageBucket: "savekarlo-1f6ea.appspot.com",
    messagingSenderId: "41295383102",
    appId: "1:41295383102:web:bb05455e0a9fc847cf5f6f"
});
export const auth = fire.auth();
export const db = fire.firestore();
export default {
  fire,
};