import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import NewNoteScreen from './screens/NewNoteScreen'
import firebase from './services/firebaseService'
import { UserContext } from './context'

import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Register" component={RegisterScreen}/>
    <Stack.Screen name="Login" component={LoginScreen}/>
  </Stack.Navigator>
)

const NotesNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      // eslint-disable-next-line react/display-name
      tabBarIcon: ({ focused, color, size }) => {
        let iconName

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-information-circle'
            : 'ios-information-circle-outline'
        } else if (route.name === 'New Note') {
          iconName = focused
            ? 'ios-add-circle'
            : 'ios-add'
        }
        return <Ionicons name={iconName} size={size} color={color} />
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen}/>
    <Tab.Screen name="New Note" component={NewNoteScreen}/>
  </Tab.Navigator>
)

const App = () => {
  const [user, setUser] = useState() // Set to a blank object to simulate a user being signed in

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(
        user => setUser(user)
      )

    return () => unsubscribe()
  }
  , [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator screenProps headerMode='none'>
          {!user ? (
            <>
              <Stack.Screen name="Auth" component={AuthNavigator} />
            </>
          ) : (
            <>
              {/* User is signed in */}
              <Stack.Screen name="Notes" component={NotesNavigator} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  )
}

export default App