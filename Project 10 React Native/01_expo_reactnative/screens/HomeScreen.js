import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { UserContext } from '../context'
import { TouchableOpacity } from 'react-native-gesture-handler'

const HomeScreen = () => {
  return (
    <UserContext.Consumer>
      {
        ({ user, setUser }) =>
          <View style={styles.container}>
            <Text>Welcome {user.displayName}</Text>
            <TouchableOpacity onPress={() => setUser('test')}>
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
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default HomeScreen
