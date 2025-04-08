import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey:             "YOUR_API_KEY",
  appId:              "YOUR_APP_ID",
  authDomain:         "YOUR_AUTH_DOMAIN",
  messagingSenderId:  "YOUR_MESSAGING_SENDER_ID",
  projectId:          "YOUR_PROJECT_ID",
  storageBucket:      "YOUR_STORAGE_BUCKET"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);