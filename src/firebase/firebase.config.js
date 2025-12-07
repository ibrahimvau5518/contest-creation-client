// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyApI6VHJS74u_2fdGIBT-2udiB9jqL5_kU',
  authDomain: 'contest-creation-client.firebaseapp.com',
  projectId: 'contest-creation-client',
  storageBucket: 'contest-creation-client.firebasestorage.app',
  messagingSenderId: '713451781876',
  appId: '1:713451781876:web:2b72b3cd47db96617928a1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
