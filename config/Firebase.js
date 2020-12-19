import firebase from 'firebase';
// import {
//     API_KEY,
//     AUTH_DOMAIN,
//     DATABASE_URL,
//     PROJECT_ID,
//     MESSAGE_SENDER_ID,
//     STORAGE_BUCKET,
//     APP_ID
// } from '@env';

const firebaseConfig = {
    apiKey: 'AIzaSyBdBv3YH4TKPUUtvG3T3VD_tz4igYHBk4s',
    authDomain: 'fundonotes-d4273.firebaseapp.com',
    databaseURL: 'https://fundonotes-d4273-default-rtdb.firebaseio.com/',
    projectId: 'fundonotes-d4273',
    storageBucket: 'fundonotes-d4273.appspot.com',
    messagingSenderId: '383232665932',
    appId: '1:383232665932:android:fa677d230dfc3142b507e9'
}

// Initilize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase