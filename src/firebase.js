import firebase from 'firebase';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCwMbSKhR9BW3xXic9KP37plKiHUWb-wuY",
    authDomain: "mock-up-d0d2d.firebaseapp.com",
    databaseURL: "https://mock-up-d0d2d.firebaseio.com",
    projectId: "mock-up-d0d2d",
    storageBucket: "mock-up-d0d2d.appspot.com",
    messagingSenderId: "7261255904"
  };
  firebase.initializeApp(config);

  export const auth = firebase.auth();

  export const storage = firebase.storage();
  
  export default firebase;