import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import headers from '../headers';

const base64 = require('base-64');



const LoginPage = ({navigation}) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birth_date, setBirthDate] = useState(new Date());
    const [birth_text, setBirthText] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [errorText, setErrorText] = useState('');



    const validateEmail = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
          console.log("Email is Not Correct");
          setEmail(text);
          return false;
        }
        else {
          setEmail(text);
          console.log("Email is Correct");
        }
      }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
        setBirthDate(date);
        console.log(birth_date);
        setBirthText(format(date,"MM.dd.yyyy"));
        hideDatePicker();
      };

   
    const handleSignUp = () => {
      let email_reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      let password_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      var now = new Date();

      if(name.length < 3 || name.length > 15){
        setErrorText("The name must contain at least 3 and no more than 15 letters.")
      }else if(surname.length < 3 || surname.length > 15){
        setErrorText("The surname must contain at least 3 and no more than 15 letters.")
      }else if(username.length < 3 || surname.length > 15){
        setErrorText("The username must contain at least 3 and no more than 15 letters.")
      }else if(email_reg.test(email) == false){
        setErrorText("Please enter a valid email")
      }else if(birth_date > now){
        setErrorText("Birthdate must be in the past")
      }else if(password_reg.test(password) == false){
        //8 char, upper case, lower case, one number
        setErrorText("Password must have 8 char, at least one upper, lower and number")
      }else{
        setErrorText('');


  const auth = "Basic " + base64.encode("retimy-security:7a83758a-0d83-40c1-9dba-ce3612b2ac4f");
        
  fetch("http://localhost:8080/user/save", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: auth
  },
  body: JSON.stringify({
    first_name: name,
    last_name: surname,
    userName: username,
    email: email,
    password: password,
    birth_date: birth_date,
    posts: [],
    liked_posts: [],
    followers: [],
    followings: [],
    known_users: [],
    timestamp: new Date()
  }),
})
  .then((response) =>
  { 

    if(response.status == 201){
      navigation.navigate('LoginPage')
    }else{
      setErrorText("There is a network error. Please try again after a while.")
    }

  });
      }
  
    };
  
    return (
        
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Surname"
          value={surname}
          onChangeText={(text) => setSurname(text)}
        />
        <TextInput
        style={styles.input}
        placeholder="User Name"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => validateEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button color="rgb(115,115,115)"  title="Pick Birth Date" onPress={showDatePicker} />
        <TouchableOpacity onPress={showDatePicker}><Text style={styles.birthText} >{birth_text}</Text></TouchableOpacity>
        <Text style={styles.errorText}>{errorText}</Text>
        <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        />    
        
        <Button style={styles.signupButton} title="Sign Up" onPress={handleSignUp} />
      </View>

      
      
    );
  };

  const styles = StyleSheet.create({
    
    errorText: {
      color: "red",
      fontSize: 20,
      paddingBottom: 20
    },
    birthText: {
        color: "rgb(43,44,45)",
        fontSize: 20,
        paddingBottom: 20
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
