import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet} from 'react-native';
import OpeningPage from './OpeningPage';
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OpeningPage">
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ title: 'Login' }}

        />
        <Stack.Screen 
          name="OpeningPage" 
          component={OpeningPage}
          options={{headerShown: false}} />
          <Stack.Screen
          name='SignupPage'
          component={SignupPage}
          options={{title: 'Sign Up'}}
          />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "red"
  }
});
