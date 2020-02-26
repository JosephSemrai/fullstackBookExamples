import React, { useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

const NewNote = () => {
  const [formValue, setFormValue] = useState("")

  const handleSubmit = async () => {
    firebase.firestore().collection('notes').add({
      content: formValue,
      flagged: false
    })
    .then(() => console.log("Document successfully written!"))
    .catch(error => console.error("Error writing document: ", error))

    setFormValue("")
  }

  return (
    <>
      <input type="text" value={formValue} onChange={event => setFormValue(event.target.value)} />
      <button onClick={handleSubmit}>Create</button>
    </>
  )
}

export default NewNote