import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "xx",
    authDomain: "xx",
    projectId: "xx",
    storageBucket: "xx",
    messagingSenderId: "xx",
    appId: "xx"
};

//init firebase

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//timestamp

const timestamp = firebase.firestore.Timestamp; 

export {
    projectFirestore,
    projectAuth,
    timestamp
}