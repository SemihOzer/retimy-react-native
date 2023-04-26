import {React, useState} from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { Icon } from '@rneui/themed';


var posts = [];
      fetch("http://localhost:8080/post/getAllPosts")
          .then(response => response.json())
          .then(json => {
            posts = Object.values(json);

          })
          .catch(error => {
            console.error(error);
          });
            

const Post = ({ title, text, image, comments, likes }) => {
    const [icon, setIcon] = useState("favorite-border");
    const [comment, setComment] = useState('');
    const [isVisibleCommentSend, setIsVisibleCommentSend] = useState(false);

    const likeButtonHandle = () => {
        if(icon == "favorite"){
            setIcon("favorite-border")
        }else if(icon == "favorite-border"){
            setIcon("favorite")
        }
      };

      const sendButtonHandle = () => {
        //TODO: Send comment

      };
      
      const onChangeTextComment = (text) => {
        setComment(text)
        if(text.length > 0){
          setIsVisibleCommentSend(true)
        }else{
          setIsVisibleCommentSend(false)
        }
      };

  return (<View style={styles.post}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.text}>{text}</Text>
    {image && <Image source={{ uri: image }} style={styles.image} />}
    <View style={styles.footer}>
        <View style={styles.footerRow}>
        <TouchableOpacity onPress={likeButtonHandle}><Icon style={styles.icon} name={icon}/></TouchableOpacity>
            <Text style={styles.likes}>{likes} Likes</Text>
        </View>
        <View style= {styles.commentRow}>
        <TextInput
          placeholder="Comment..."
          value={comment}
          onChangeText={onChangeTextComment}
        />
        <TouchableOpacity onPress={sendButtonHandle}><Icon style={{ display: isVisibleCommentSend ? 'flex' : 'none' }} name="send"/></TouchableOpacity>
        </View>
      <FlatList
        style= {{paddingTop: 4}}
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.comment}>{item.text}</Text>}
      />
    </View>
  </View>
  
  );
};

const HomePage = () => (
  <View>
  <FlatList
    data={posts}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => <Post title={item.title} text={item.text} image={item.image} comments={item.comments} likes={item.likes} />}
  />
  
  </View>
);

const styles = StyleSheet.create({
    
    commentRow:{
      flexDirection:'row',
      justifyContent: 'space-between',
      paddingLeft: 1,
    },
        
    footerRow:{
        flexDirection: 'row',
    
    },

  post: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
  footer: {
    marginTop: 8
  },
  likes: {
    fontWeight: 'bold',
    marginBottom: 5,
    paddingTop: 4,
    paddingLeft:3
  },
  comment: {
    marginBottom: 4,
    paddingLeft: 1,
  },
});

export default HomePage;