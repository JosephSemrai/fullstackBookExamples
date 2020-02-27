import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

const Notes = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection("notes")
      .onSnapshot(querySnapshot => {
        let notes = []
        querySnapshot.forEach(d => {
          let noteData = d.data()
          noteData.id = d.id
          notes.push(noteData)
        })
        setNotes(notes)
      })
    return unsubscribe
  }, [])

  const onToggle = note => {
    const noteRef = firebase.firestore().collection("notes").doc(note.id)

    noteRef.update({
      flagged: !note.flagged
    })
    .then(() => {
      console.log("Document successfully updated!")
    })
    .catch(error => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error)
    })
  }

  return (
    <>
      {notes.map(note => (
        <div key={note.id}>
          <input type="checkbox" onChange={() => onToggle(note)} checked={note.flagged} /> {note.content}
        </div>
      ))}
    </>
  )
}

export default Notes