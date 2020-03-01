import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import firebase from '../services/firebaseService'

const NewNoteScreen = () => {
  const [formValue, setFormValue] = useState('')
  const [error, setError] = useState()
  const [message, setMessage] = useState()

  const handleSubmit = async () => {
    firebase
      .firestore()
      .collection('notes')
      .add({
        content: formValue,
        flagged: false
      })
      .then(() => setMessage('Successfully created note!'))
      .catch(err => setError(err.message))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Create a Note
      </Text>

      {error ?
        <View style={styles.error}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
        : null}

      {message ?
        <View style={styles.message}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
        : null}

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          onChangeText={text => setFormValue(text)}
          value={formValue}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    marginVertical: 80,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    borderBottomColor: '#34495e',
    marginBottom: 15
  },
  button: {
    marginHorizontal: 40,
    marginVertical: 10,
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
  error: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    padding: 10
  },
  errorText: {
    color: 'white',
    fontWeight: 'bold'
  },
  message: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    padding: 10
  },
  messageText: {
    color: 'white',
    fontWeight: 'bold'
  },
  card:{
    padding: 15,
    width: '90%',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    backgroundColor: 'white',
    borderRadius: 6
  }
})

export default NewNoteScreen
