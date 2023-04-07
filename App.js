import React from 'react'
import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './src/application/Navigations/AuthNavigator'
import { StatusBar } from 'react-native'
import { navigationRef } from './src/application/Navigations/config'

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AuthNavigator />
      <StatusBar />
    </NavigationContainer>
  )
}

export default App
