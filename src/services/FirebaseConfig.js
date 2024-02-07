import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJV1-G2y7WpVncbN-YtSVJpzH7G6NUPp8",
  authDomain: "carine-lima.firebaseapp.com",
  projectId: "carine-lima",
  storageBucket: "carine-lima.appspot.com",
  messagingSenderId: "909436190367",
  appId: "1:909436190367:web:fc2394790390c9c025ecaa",
  measurementId: "G-EXBVMQGQ37"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

// export { db };
