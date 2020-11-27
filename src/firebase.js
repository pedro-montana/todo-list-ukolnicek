import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyDSrwyllJqgbN-ObLqgXD0x8RiaQNzi2H4",
    authDomain: "todoist-d9b56.firebaseapp.com",
    databaseURL: "https://todoist-d9b56.firebaseio.com",
    projectId: "todoist-d9b56",
    storageBucket: "todoist-d9b56.appspot.com",
    messagingSenderId: "892036886510",
    appId: "1:892036886510:web:cb4ea66327895a411028ff"
});

export { firebaseConfig as firebase };