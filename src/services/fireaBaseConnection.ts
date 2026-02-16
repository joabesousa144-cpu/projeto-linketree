
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBud03uwnx6GDEg1B03TW-nYEq_g-FwVmQ",
  authDomain: "projeto-linketree-aef9b.firebaseapp.com",
  projectId: "projeto-linketree-aef9b",
  storageBucket: "projeto-linketree-aef9b.firebasestorage.app",
  messagingSenderId: "566352698026",
  appId: "1:566352698026:web:991e7a4a66300a6aa9ced3",
  measurementId: "G-G0W8KYQ7E4"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const banco = getFirestore(app)


export {auth, banco}