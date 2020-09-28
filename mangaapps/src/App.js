import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { LogBox, StyleSheet } from 'react-native';
import FlashMessage from "react-native-flash-message";
import Router from './router';

const App = () => {
  LogBox.ignoreLogs(['Setting a timer'])
  LogBox.ignoreLogs(['times have drifted'])
  return (
    <>
    <NavigationContainer>
      <Router />
    </NavigationContainer>
    <FlashMessage position='top' />
    </>
  )
}

export default App

const styles = StyleSheet.create({})
