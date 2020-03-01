import firebase from 'firebase/app'
require('firebase/auth')

// Firebase configuration provided to us by the app creation process
const firebaseConfig = {
  apiKey: 'AIzaSyDJf0kn4MHA8mMgolqu1DLh3YqrjSAt57Q',
  authDomain: 'notes-app-bfbc5.firebaseapp.com',
  databaseURL: 'https://notes-app-bfbc5.firebaseio.com',
  projectId: 'notes-app-bfbc5',
  storageBucket: 'notes-app-bfbc5.appspot.com',
  messagingSenderId: '768088207404',
  appId: '1:768088207404:web:abd4b64d40dbab447e6189',
  measurementId: 'G-NBKG2S4VX5'
}

// Initializes Firebase and creates an app instance
try {
  !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
} catch (err) {
  // Catches 'already initialized' errors and logs it to enable hot reloading to continue to work
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error raised', err.stack)
  }
}

export default firebase