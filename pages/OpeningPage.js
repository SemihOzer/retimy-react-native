import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OpeningPage = ({navigation}) => {
  return (
   
    <View style={styles.container}>
      <Image source={require('/Users/semihozer/Desktop/retimy-react-native/assets/retimy-logo.png')} style={styles.logo} />
      <Text style={styles.welcomeText}>Welcome to reTimy!</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginPage')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignupPage')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: -20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,

  },
  button: {
    backgroundColor: 'rgb(0, 0, 0)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'rgb(206, 206, 206)',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OpeningPage;
