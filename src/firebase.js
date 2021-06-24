import firebase from "firebase";
import 'firebase/auth';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-Z_mEgbIC6xjkJ0365XTg7LzU_q_0vo8",
  authDomain: "snapchat-clone-adi.firebaseapp.com",
  projectId: "snapchat-clone-adi",
  storageBucket: "snapchat-clone-adi.appspot.com",
  messagingSenderId: "537122154751",
  appId: "1:537122154751:web:dd31518913c4a4a05a84ca",
  measurementId: "G-SL62DN0XRW",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
