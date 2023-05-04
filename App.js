import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Image} from 'react-native';
import OpeningPage from './pages/OpeningPage';
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePostPage';

const Stack = createNativeStackNavigator();


export default function App() {
  
  function LogoTitle() {
    return (
      <Image
        style={{ width: 150, height: 80 }}
        source={require('/Users/semihozer/Desktop/retimy-react-native/assets/retimy-logo-notext.png')}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignupPage">
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
          <Stack.Screen
          name="HomePage"
          options={{
              headerStyle: {
                backgroundColor: 'rgb(230, 230, 230)',
              },
              headerTitle: (props) => <LogoTitle {...props}/>,
              headerTitleStyle: {
                color: 'black',
                fontSize: 20
              }
            
          }}
          component={HomePage}
          />
          <Stack.Screen
          name='CreatePostPage'
          component={CreatePostPage}
          options={{headerShown: false}}
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
