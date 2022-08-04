import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmiWD35dSHhBRU_xaQTyg09o0GKmeRrPQ",
  authDomain: "agrocar-159704.firebaseapp.com",
  databaseURL: "https://agrocar-159704.firebaseio.com",
  projectId: "agrocar-159704",
  storageBucket: "agrocar-159704.appspot.com",
  messagingSenderId: "803767824331",
  appId: "1:803767824331:web:986d5e920d36db1b40504e"
};
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const providerGmail = new GoogleAuthProvider();

export {auth, providerGmail, signInWithPopup}