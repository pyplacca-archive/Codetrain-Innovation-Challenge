import firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "ct-innovation-challenge.firebaseapp.com",
  projectId: "ct-innovation-challenge",
  storageBucket: "ct-innovation-challenge.appspot.com",
  messagingSenderId: "11022703412",
  appId: "1:11022703412:web:cdd4899d3a8a23c8302361"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage().ref();

export {
	db,
	storage,
};
