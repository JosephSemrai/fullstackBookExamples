import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Register Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default RegisterScreen