import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { Store } from './Redux/store';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './navigation/Navigator'
import ProfessorNavigator from './navigation/ProfessorNavigator';


// Font
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font'
const fetchFont = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

import { createStackNavigator } from "@react-navigation/stack";

import { Alert } from "react-native";

const Stack = createStackNavigator();

const RootStack=()=>{
  <Stack.Navigator
        screenOptions={{
            headerShown : false
        }}
        initialRouteName='Login'
    >
        <Stack.Screen
            name='Login'
            component={Login}
        />
        <Stack.Screen
            name='Register'
            component={Register}
        />
    </Stack.Navigator>
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (<AppLoading
      startAsync={fetchFont}
      onFinish={() => { setFontLoaded(true) }}
      onError={(err) => { console.log(err) }}
    />)
  }
  return (
    <Provider store={Store}>

      <NavigationContainer>
        <Navigator></Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({

});
