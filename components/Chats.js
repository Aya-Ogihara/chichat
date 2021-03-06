import React, { Component } from 'react';
import { View, Platform, KeyboardAvoidingView, LogBox } from 'react-native';
import CustomActions from './CustomActions'
import MapView from 'react-native-maps';
// NetInfo
import NetInfo from '@react-native-community/netinfo';

// AsyncStorage
//import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import Gifted chat
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';

// Firebase
import firebase from 'firebase';
import firestore from 'firebase';
// const firebase = require('firebase');
// require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC4iO54qRHeFSYaDT9qf5DW-V26XLSoKUw',
  authDomain: 'chichat-aya.firebaseapp.com',
  projectId: 'chichat-aya',
  storageBucket: 'chichat-aya.appspot.com',
  messagingSenderId: '6208330153',
  appId: '1:6208330153:web:58d7946a3849b961d5ccb8',
};

export default class Chats extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      isConnected: false,
      image: null,
      location: null,
    };

    // initializing firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // creating a references to messages collection
    this.referenceChatMessages = firebase.firestore().collection('messages');
    //this.referenceChatsUser = null;

    // To remove warning message in the console
    LogBox.ignoreLogs([
      'Setting a timer',
      'Warning: ...',
      'undefined',
      'Animated.event now requires a second argument for options',
    ]);
  }

  componentDidMount() {
    const name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: 'Alex & ' + name });

    // check if user is online or offline
    NetInfo.fetch().then((connection) => {
      // user is online
      if (connection.isConnected) {
        // listen to authentication events
        this.authUnsubscribe = firebase
          .auth()
          .onAuthStateChanged(async (user) => {
            if (!user) {
              await firebase.auth().signInAnonymously();
            }
            // update user state with currently active user data
            this.setState({
              uid: user.uid,
              messages: [],
              user: {
                _id: user.uid,
                name: name,
                avatar: 'https://placeimg.com/140/140/people',
              },
              isConnected: true,
            });

            this.unsubscribe = this.referenceChatMessages
              .orderBy('createdAt', 'desc')
              .onSnapshot(this.onCollectionUpdate);
          });
      } else {
        // user is off line
        this.setState({ isConnected: false });
        // get messages from AsyncStorage
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    // stop listening to authentication
    this.authUnsubscribe();
    // stop listening for changes
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    //go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      const data = doc.data();
      messages.push({
        _id: data._id,
        createdAt: data.createdAt.toDate(),
        text: data.text || null,
        user: data.user,
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages,
    });
    // save messages locally to AsyncStorage
    this.saveMessage();
  };

  addMessage() {
    const message = this.state.messages[0];
    //add a new message to the collection
    this.referenceChatMessages.add({
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text || '',
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
  }

  // get stored messages from AsyncStorage
  async getMessages() {
    let messages = '';
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  // save messages to AsyncStorage
  async saveMessage() {
    try {
      await AsyncStorage.setItem(
        'messages',
        JSON.stringify(this.state.messages)
      );
    } catch (err) {
      console.log(err.message);
    }
  }

  // delete stored messages from AsyncStorage
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: [],
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
        this.saveMessage();
      }
    );
  }

  // chat bubble color setting
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#FF8DA1',
          },
        }}
      />
    );
  }

  // disable input bar when user is offline
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }

  // Custom Actions
  renderCustomActions(props) {
    return <CustomActions {...props} />
  }

  //Custom location View
  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView 
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3,
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      )
    }
    return null;
  }

  render() {
    const color = this.props.route.params.bgColor;

    return (
      <View style={{ flex: 1, backgroundColor: color }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            name: this.state.user.name,
            avatar: this.state.user.avatar,
          }}
        />
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior='height' />
        ) : null}
      </View>
    );
  }
}
