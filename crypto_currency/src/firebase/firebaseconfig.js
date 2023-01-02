// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCBTZ5bNPH0lZ3BuPZmXTtSU2qJaC7FIgQ",
  authDomain: "crypto-hunter-e55cd.firebaseapp.com",
  projectId: "crypto-hunter-e55cd",
  storageBucket: "crypto-hunter-e55cd.appspot.com",
  messagingSenderId: "225752287517",
  appId: "1:225752287517:web:c5f460f81ec62b99e5b9f4"
}

// Initialize Firebase
const App = initializeApp(firebaseConfig);
const auth=getAuth(App)
const db=getFirestore(App)




export {auth,db}