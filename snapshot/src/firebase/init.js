import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyD7Ln2sdDRvsF_-IqydrMP6Yx_bvWfMsC4',
  authDomain: 'vue-snapshot-247d1.firebaseapp.com',
  databaseURL: 'https://vue-snapshot-247d1.firebaseio.com',
  projectId: 'vue-snapshot-247d1',
  storageBucket: 'vue-snapshot-247d1.appspot.com',
  messagingSenderId: '289488721843',
  appId: '1:289488721843:web:ec0d474bda654f0f'
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// export firestore db
export default firebaseApp.firestore();
