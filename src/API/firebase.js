import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.React_App_apiKey,
  authDomain: process.env.React_App_authDomain,
  projectId: process.env.React_App_projectId,
  storageBucket: process.env.React_App_storageBucket,
  messagingSenderId: process.env.React_App_messagingSenderId,
  appId: process.env.React_App_appId,
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
export const database = {
  docs: firestore.collection("docs"),
  date: firebase.firestore.FieldValue.serverTimestamp,
};

export const storage = firebase.storage();

export const auth = firebase.auth();
