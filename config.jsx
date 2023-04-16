// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY3C5Qys3-hpSlZqcsEU1bqBy9LjwZS7c",
  authDomain: "laundry-175ef.firebaseapp.com",
  projectId: "laundry-175ef",
  storageBucket: "laundry-175ef.appspot.com",
  messagingSenderId: "181804555156",
  appId: "1:181804555156:web:e3cd7e4af8c4ebf9418d81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initiera Firestore
const db = getFirestore(app);

export default db;
