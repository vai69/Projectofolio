import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAAtcBhmKARiHpWSi08J2bCu0Xftdi0kQM",
  authDomain: 'projectofolio-e4677.firebaseapp.com',
  databaseURL: 'https://projectofolio-e4677.firebaseio.com',
  projectId: 'projectofolio-e4677',
  storageBucket: 'projectofolio-e4677.appspot.com',
  messagingSenderId: '737555564753',
  appId: '1:737555564753:android:11a54aa90655da9528ddf0',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };