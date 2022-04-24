// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyrpoL-dOmi25ECs4tQuBrEhehjMOhZSk",
  authDomain: "ventas-db2b6.firebaseapp.com",
  projectId: "ventas-db2b6",
  storageBucket: "ventas-db2b6.appspot.com",
  messagingSenderId: "733849229605",
  appId: "1:733849229605:web:167b1ad5725b3c1b8ca2cc",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export { firebase };
