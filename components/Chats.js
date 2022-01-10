import React, { Component } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';

//import Gifted chat
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

export default class Chats extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    const name = this.props.route.params.name;
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello ' + name + '!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/people',
          },
        },
        {
          _id: 2,
          text: 'Alex joined chat',
          createdAt: new Date(),
          system: true
        }
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  // chat bubble color setting
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#FF8DA1'
          }
        }}
      />
    )
  }

  render() {
    const name = this.props.route.params.name;
    const color = this.props.route.params.bgColor;
    this.props.navigation.setOptions({ title: 'Alex & ' + name });
    return (
      <View style={{ flex: 1, backgroundColor: color, }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior='height' />
        ) : null}
      </View>
    );
  }
}
