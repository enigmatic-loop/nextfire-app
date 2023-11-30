import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDYF_EbkMqzSi9mU1KkoJb-ou2a7rg7uVA",
  authDomain: "nextfire-e514e.firebaseapp.com",
  projectId: "nextfire-e514e",
  storageBucket: "nextfire-e514e.appspot.com",
  messagingSenderId: "663183013218",
  appId: "1:663183013218:web:1545383a522cabaaf4683b",
  measurementId: "G-FD59FVXH3H"
};

const app = firebase.initializeApp(firebaseConfig)

export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider;

export const firestore = firebase.firestore();
export const storage = firebase.storage();