import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Votre configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDETwmBEm1nemWrUN7Twb4t_quzhUN28uI",
    authDomain: "native-trello.firebaseapp.com",
    projectId: "native-trello",
    storageBucket: "native-trello.appspot.com",
    messagingSenderId: "610477342967",
    appId: "1:610477342967:web:6fc3a6a0e6520ca5bb93f2"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Auth avec persistance
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
