// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5gHYZocaryT6JaK5eg6_aTlcdol2ir64",
  authDomain: "form-react-waves.firebaseapp.com",
  projectId: "form-react-waves",
  storageBucket: "form-react-waves.appspot.com",
  messagingSenderId: "525083052101",
  appId: "1:525083052101:web:c3022a065f037497d3bb2c",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export { firebase };
