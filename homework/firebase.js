import { initializeApp } from 'firebase/app';
import 'firebase/auth';

// Optionally import the services that you want to use
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'api-AIzaSyBvT74_-8vuzMUufH-vaVS-9LtHsB19ZNo',
  appId: '459275156208',
  authDomain: 'homework-ff869.firebaseapp.com',
  databaseURL: 'https://homework-ff869.firebaseio.com',
  measurementId: 'G-measurement-id',
  messagingSenderId: 'sender-id',
  projectId: 'homework-ff869',
  storageBucket: 'homework-ff869.appspot.com',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
