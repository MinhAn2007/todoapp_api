import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './screen/LoginScreen'
import RegisterScreen from './screen/RegisterScreen'
import TakeNoteScreen from './screen/TakeNoteScreen'
const navigator = () => {
    const Stack = createStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="TakeNoteScreen" component={TakeNoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default navigator

const styles = StyleSheet.create({})