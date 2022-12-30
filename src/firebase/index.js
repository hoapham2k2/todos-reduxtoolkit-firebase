import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAR2N1Vh6ICPtVTLTaL8LVI8dJxlEwaUKY",

  authDomain: "hoaphamtodos-e30eb.firebaseapp.com",

  projectId: "hoaphamtodos-e30eb",

  storageBucket: "hoaphamtodos-e30eb.appspot.com",

  messagingSenderId: "195616466782",

  appId: "1:195616466782:web:825fb1b324e322a9e691cf",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
