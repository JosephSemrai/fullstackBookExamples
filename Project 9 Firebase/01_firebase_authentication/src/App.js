import React, { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app' // Allows us to create app instances
import 'firebase/auth' // Gives us Firebase authentication support
import NewNote from './components/NewNote'
import Notes from './components/Notes'

// Firebase configuration provided to us by the app creation process
const firebaseConfig = {
  apiKey: "AIzaSyDJf0kn4MHA8mMgolqu1DLh3YqrjSAt57Q",
  authDomain: "notes-app-bfbc5.firebaseapp.com",
  databaseURL: "https://notes-app-bfbc5.firebaseio.com",
  projectId: "notes-app-bfbc5",
  storageBucket: "notes-app-bfbc5.appspot.com",
  messagingSenderId: "768088207404",
  appId: "1:768088207404:web:abd4b64d40dbab447e6189",
  measurementId: "G-NBKG2S4VX5"
};

// Initializes Firebase and creates an app instance
firebase.initializeApp(firebaseConfig)

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers. Also configures the component with the provider IDs.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // `signInSuccessWithAuthResult` is called with the user object when the user has successfully logged in
    signInSuccessWithAuthResult: () => false // Empty function as we do not want to do anything just yet
  }
}

const onAuthStateChange = (setUser) => {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log("The user is logged in.", user)
      setUser(user)
    } else {
      console.log("The user is not logged in.")
    }
  })
}

const App = () => {
  const [user, setUser] = useState()

  const handleSignOut = () => {
    firebase.auth().signOut()
    setUser()
  }

  useEffect(() => {
    // Realtime authentication listener subscription
    const unsubscribe = onAuthStateChange(setUser) // Returns the unsubscribe function
    // Unsubscribes from the listener when unmounting
    return () => unsubscribe()
  }, [])

  return (
    <>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>

      {user ?
        <>
          <NewNote />
          <button onClick={handleSignOut}>Sign Out</button>
          <Notes />
        </> : 
        <p>Please Sign In</p>}
    </>
  )
}

export default App