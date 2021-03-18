import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyD_gnsPl-z-xXqgzDvR7o_peSVQwAehCK8',
  authDomain: 'todo-ukolnicek.firebaseapp.com',
  projectId: 'todo-ukolnicek',
  storageBucket: 'todo-ukolnicek.appspot.com',
  messagingSenderId: '682817859987',
  appId: '1:682817859987:web:84d1d29b3c6f6d006ff866',
});

export { firebaseConfig as firebase };
