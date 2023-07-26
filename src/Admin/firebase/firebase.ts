// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-buI_ydYrsT5KPo-dD5nKlddLO6ieRwM",
  authDomain: "prn231project.firebaseapp.com",
  projectId: "prn231project",
  storageBucket: "prn231project.appspot.com",
  messagingSenderId: "302115888849",
  appId: "1:302115888849:web:3b56ecdb3aede18da06ff0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);