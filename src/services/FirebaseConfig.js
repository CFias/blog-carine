import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAPnpLAeq7mgac8ARpeoEOToHPcxu21pj0",
  authDomain: "blog-carine.firebaseapp.com",
  projectId: "blog-carine",
  storageBucket: "blog-carine.appspot.com",
  messagingSenderId: "427065831093",
  appId: "1:427065831093:web:493285d224c0243bcc18fc",
  measurementId: "G-SHR2PGN3M5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };