// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCE3Yyr8KZVNgBFwfocOee-CuW_yhH5xk",
  authDomain: "finnawalk-f8f43.firebaseapp.com",
  projectId: "finnawalk-f8f43",
  storageBucket: "finnawalk-f8f43.appspot.com",
  messagingSenderId: "802765788953",
  appId: "1:802765788953:web:8b2ebf72d22ec13fd25788",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default app;
