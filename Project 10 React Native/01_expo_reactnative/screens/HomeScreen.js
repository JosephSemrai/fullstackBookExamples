import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { UserContext } from '../context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firebase from '../services/firebaseService'
import Note from '../components/Note'

const HomeScreen = () => {

  const [notes, setNotes] = useState([])

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('notes')
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
    <UserContext.Consumer>
      {
        ({ user, setUser }) =>
          <View style={styles.container}>
            <Text style={styles.title}>{`Welcome ${user.displayName},\nHere are your notes`}</Text>

            <FlatList
              data={notes}
              style={styles.noteList}
              renderItem={({ item }) => (
                <Note
                  id={item.id}
                  note={item}
                />
              )}
            />

            <TouchableOpacity style={styles.reset} onPress={() => setUser('test')}>
              <Text>
                Reset User
              </Text>
            </TouchableOpacity>
          </View>
      }
    </UserContext.Consumer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: '40%',
    marginBottom: '10%'
  },
  card: {
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
  noteList: {
    width: '100%'
  },
  noteText: {
    marginHorizontal: 10,
    width: '80%'
  },
  reset: {
    marginTop: 15
  }
})

export default HomeScreen