import React from 'react'
import { StyleSheet, View, Switch, Text } from 'react-native'
import firebase from '../services/firebaseService'

const onToggle = note => {
  const noteRef = firebase.firestore().collection('notes').doc(note.id)

  noteRef.update({
    flagged: !note.flagged
  })
    .then(() => {
      console.log('Document successfully updated!')
    })
    .catch(error => {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error)
    })
}

const Note = ({ note }) => {

  return (
    <View style={styles.card} key={note.id}>
      <Switch onChange={() => onToggle(note)} value={note.flagged} />
      <Text style={styles.noteText}>
        {note.content}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card:{
    flexDirection: 'row',
    marginTop: 10,
    padding: 15,
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    backgroundColor: 'white',
    borderRadius: 6,
    alignItems: 'center'

  },
  noteText: {
    marginHorizontal: 10,
    width: '80%'
  }
})

export default Note

