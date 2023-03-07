import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMWFTS2D1HtsesE-elnMl26h-qtH2ESmI",
  authDomain: "to-do-list-289d6.firebaseapp.com",
  databaseURL: "https://to-do-list-289d6-default-rtdb.firebaseio.com",
  projectId: "to-do-list-289d6",
  storageBucket: "to-do-list-289d6.appspot.com",
  messagingSenderId: "948154908381",
  appId: "1:948154908381:web:5e6492bd880b2cbe5aa534",
  measurementId: "G-J6BCDFMJSN",
};
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);