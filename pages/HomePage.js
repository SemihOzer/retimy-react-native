import {React, useState} from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { Icon } from '@rneui/themed';
import AWS from 'aws-sdk';
import awsConfig from '../assets/awsConfig';


var posts = [];
      fetch("http://localhost:8080/post/getAllPosts")
          .then(response => response.json())
          .then(json => {
            posts = Object.values(json);

          })
          .catch(error => {
            console.error(error);
          });

const s3 = new AWS.S3({
  region: awsConfig.region,
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretAccessKey,
});

const Post = ({title, text, image, comments, likes}) => {
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

      
      if(image != null){
        const params = {
          Bucket: 'retimy-images',
          Key: image
        };
        
        s3.getObject(params, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data.Body.data.toString('utf-8'));

          }
        });
      }

      

  return (<View style={styles.post}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.text}>{text}</Text>
    
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

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('/Users/semihozer/Desktop/retimy-react-native/assets/retimy-logo-notext.png')}
        style={styles.logo}
      />
    </View>
  );
};

const HomePage = ({navigation,route}) => {
  //route.params.json....
  return (<View>
  <Header/>
  <FlatList
    data={posts}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => <Post title={item.title} text={item.text} image={item.photo_id} comments={item.comments} likes={item.likes.length} />}
  />
  
  </View>);
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    backgroundColor: 'rgb(230, 230, 230)',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    marginTop:30,
    width: 150,
    height: 50,
  },
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
