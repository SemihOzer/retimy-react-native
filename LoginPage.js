import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { StyleSheet } from 'react-native';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = ({navigation}) => {
      console.log(`Username: ${username}, Password: ${password}`);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <Button title="Log in" onPress={handleLogin} />
      </View>
      
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',


    },
    title: {
      fontSize: 50,
      paddingBottom: 20
    
    },
    input: {
      width: '80%',
      height: 48,
      padding: 12,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 16,
      fontSize: 16,
    },
  });
  
  export default LoginPage;
