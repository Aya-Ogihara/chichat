import React, { Component } from 'react';
import { View, Platform, KeyboardAvoidingView, LogBox } from 'react-native';

//import Gifted chat
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

// Firebase
const firebase = require('firebase');
require('firebase/firestore');

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

    // listen to authentication events
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
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
      });

      this.unsubscribe = this.referenceChatMessages
        .orderBy('createdAt', 'desc')
        .onSnapshot(this.onCollectionUpdate);
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
        text: data.text,
        user: data.user,
      });
    });
    this.setState({
      messages,
    });
  };

  addMessage() {
    const message = this.state.messages[0];
    //add a new message to the collection
    this.referenceChatMessages.add({
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text || '',
      user: this.state.user,
    });
  }

  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
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

  render() {
    const color = this.props.route.params.bgColor;

    return (
      <View style={{ flex: 1, backgroundColor: color }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
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
