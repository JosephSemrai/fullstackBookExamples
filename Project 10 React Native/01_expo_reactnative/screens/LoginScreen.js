import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import firebase from '../services/firebaseService'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => setError(err.message))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome back!
      </Text>

      {error ?
        <View style={styles.error}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
        : null}

      <View style={styles.form}>
        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={email => setEmail(email)}
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          autoCapitalize="none"
          onChangeText={password => setPassword(password)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>
          Sign In
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerView} onPress={() => navigation.navigate('Register')}>
        <Text>Don&apos;t have an account? <Text style={{ fontWeight: 'bold', color: '#2ecc71' }}>Sign Up</Text> </Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  title: {
    marginVertical: 60,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
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
  form: {
    marginHorizontal: 40
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    borderBottomColor: '#34495e',
    marginBottom: 30
  },
  button: {
    marginHorizontal: 40,
    marginVertical: 15,
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
  registerView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60
  }
})

export default LoginScreen