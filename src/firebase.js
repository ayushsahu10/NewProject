import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyBn8-G9jAD5oj7kCQtOk-pLJzSlff6sMaA",
  authDomain: "thewiseindia-8e9a9.firebaseapp.com",
  projectId: "thewiseindia-8e9a9",
  storageBucket: "thewiseindia-8e9a9.appspot.com",
  messagingSenderId: "426221683873",
  appId: "1:426221683873:web:521c91bd1aa23b92a71ce0",
  measurementId: "G-ZVHXJMHTQ2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;