// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZwKst1MX3V5lVG4J8VotdcsWlSehPUxQ",
  authDomain: "binar-e-commerce-007.firebaseapp.com",
  projectId: "binar-e-commerce-007",
  storageBucket: "binar-e-commerce-007.appspot.com",
  messagingSenderId: "128169874116",
  appId: "1:128169874116:web:ef9add9280ceac3bda2f91",
  measurementId: "G-L7X3ECNTRN",
  storageBucket: "gs://binar-e-commerce-007.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { storage };
