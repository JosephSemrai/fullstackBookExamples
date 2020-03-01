import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const user = {
  name: 'Test Name'
}

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {`Hello, ${user.name}\nWelcome Back`}
      </Text>
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

export default LoadingScreen
