import firebase from 'firebase';
import 'firebase/firestore';
require('dotenv').config()

const config = {
  apiKey: "AIzaSyCwMbSKhR9BW3xXic9KP37plKiHUWb-wuY",
  authDomain: "mock-up-d0d2d.firebaseapp.com",
  databaseURL: "https://mock-up-d0d2d.firebaseio.com",
  projectId: "mock-up-d0d2d",
  storageBucket: "mock-up-d0d2d.appspot.com",
  messagingSenderId: "7261255904"
};

// const config = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   databaseURL: process.env.databaseURL,
//   projectId: process.env.projectId,
//   storageBucket: process.env.storageBucket,
//   messagingSenderId: process.env.messagingSenderId
// }



firebase.initializeApp(config);

export const auth = firebase.auth();

export const storage = firebase.storage();

export default firebase;