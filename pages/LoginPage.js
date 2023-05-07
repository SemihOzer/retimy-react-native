import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { StyleSheet } from 'react-native';

const LoginPage = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');
  
    const handleLogin = ({}) => {

      fetch('http://localhost:8080/user/getByUserName/'+username)
      .then(response => response.json())
      .then(json => {
        if(password == json.password){
          console.log("True");
          setErrorText('');
          navigation.navigate('HomePage',{json});

        }else{
         setErrorText("Password or username is incorrect");
        }
      })
      .catch(error => {
        console.error(error);
      });

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
        <Text style={styles.errorText}>{errorText}</Text>
        <Button title="Log in" onPress={handleLogin} />
      </View>
      
    );
  };

  const styles = StyleSheet.create({
    errorText: {
      paddingTop: 20,
      color: "red",
      fontSize: 20,
      paddingBottom: 10
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',


    },
    title: {
      fontSize: 50,
      paddingBottom: 40
    
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
