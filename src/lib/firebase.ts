// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIQepZkLlrGQQVGit_PdNcWtgGJX_LZ90",
  authDomain: "vantech-v-store.firebaseapp.com",
  projectId: "vantech-v-store",
  storageBucket: "vantech-v-store.appspot.com",
  messagingSenderId: "494255045230",
  appId: "1:494255045230:web:2df051d9ec1bd45fbd047f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
//const app = initializeApp(firebaseConfig);
export default firebaseApp;