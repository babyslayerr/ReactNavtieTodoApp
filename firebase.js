// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzTZELdfxbhh5Lm6MOkLE5fTB1Na_weLY",
  authDomain: "react-native-todo-app-bb1db.firebaseapp.com",
  projectId: "react-native-todo-app-bb1db",
  storageBucket: "react-native-todo-app-bb1db.appspot.com",
  messagingSenderId: "947717743168",
  appId: "1:947717743168:web:a219218eb28d5cb339b5a5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
