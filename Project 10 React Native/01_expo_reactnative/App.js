import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'


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
  </Tab.Navigator>
)

const App = () => {
  const [user, setUser] = useState() // Set to a blank object to simulate a user being signed in

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
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
  )
}

export default App