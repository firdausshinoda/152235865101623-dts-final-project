import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6PlVYNxdlzW6eUfLdcWpCXb-uzhH57Mw",
  authDomain: "tensorflow-f1345.firebaseapp.com",
  projectId: "tensorflow-f1345",
  storageBucket: "tensorflow-f1345.appspot.com",
  messagingSenderId: "965051764557",
  appId: "1:965051764557:web:f451f8ff0e07d038ddf104",
  measurementId: "G-K4JXQ3W75J"

};
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const providerGmail = new GoogleAuthProvider();

export {auth, providerGmail, signInWithPopup}