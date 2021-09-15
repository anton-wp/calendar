import firebase from 'firebase'
import "firebase/firestore";

/* code from our Firebase console */
var firebaseConfig = {
    apiKey: "AIzaSyAnCsuidvHSjGQvx2jwah7DXHJIjx4j-b0",
    authDomain: "calendar-74650.firebaseapp.com",
    projectId: "calendar-74650",
    storageBucket: "calendar-74650.appspot.com",
    messagingSenderId: "132295298619",
    appId: "1:132295298619:web:6fffd03ff758c7024f561e",
    measurementId: "G-NBH46T24HK"
  }

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const firestore =  firebase.firestore();
export const dbFirebase =  firebase;