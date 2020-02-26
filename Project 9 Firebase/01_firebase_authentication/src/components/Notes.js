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

  return (
    <>
      {notes.map(note => (
        <li key={note.id}>{note.content}</li> 
      ))}
    </>
  )
}

export default Notes