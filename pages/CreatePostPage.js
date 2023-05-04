import React, { useState } from 'react';
import { View, TextInput, Button, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [base64, setBase64] = useState('');

  const handleTitleChange = (value) => {
    setTitle(value);
  };

  const handleTextChange = (value) => {
    setText(value);
  };

  const handleImagePick = async () => {

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);

      setBase64(result.assets[0].base64);
    }
  };

  const handleSave = () => {
    if (title.trim() === '' || text.trim() === '' ) {
      Alert.alert('Please fill in all fields');
      return;
    }else {
      if(base64.length == 0){
        fetch("http://localhost:8080/post/save", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    user: {
      id: '643eda397b928e0bd8cc885c',
      first_name: 'Semih',
      last_name: 'Özer',
      userName: 'semihOzer',
      email: 'semih@gmail.com',
      password: 'password',
      birth_date: ISODate('2022-04-18T17:55:04.448Z'),
      timestamp: ISODate('2023-04-18T17:55:04.448Z'),
      posts: [],
      liked_posts: [],
      comments: [],
      followers: [],
      followings: [],
      known_users: [],
      
  },
    comments: [],
    likes: [],
    title: title,
    text: text,
    photo_id: null,
  }),
})
  .then((response) => response.json())
  .then((responseData) => {
    console.log(JSON.stringify(responseData));
  });
      }else{
        fetch("http://localhost:8080/post/save", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              id: '643eda397b928e0bd8cc885c',
              first_name: 'Semih',
              last_name: 'Özer',
              userName: 'semihOzer',
              email: 'semih@gmail.com',
              password: 'password',
              birth_date: ISODate('2022-04-18T17:55:04.448Z'),
              timestamp: ISODate('2023-04-18T17:55:04.448Z'),
              posts: [],
              liked_posts: [],
              comments: [],
              followers: [],
              followings: [],
              known_users: [],
              class: 'com.semihozer.retimy.entities.User'
          },
            comments: [],
            likes: [],
            title: title,
            text: text,
            photo_id: base64,
          }),
        })
          .then((response) => response.json())
          .then((responseData) => {
            console.log(JSON.stringify(responseData));
          });
      }
    }

    // Handle saving data to a database or API
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={handleTitleChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Text"
        value={text}
        onChangeText={handleTextChange}
      />
      <Button title="Pick an image" onPress={handleImagePick} />
      {image ? <Image source={{ uri: image }} style={styles.image} /> : null}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default CreatePostPage;
