import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Chats extends Component {
  render() {
    const name = this.props.route.params.name;
    const color = this.props.route.params.bgColor;
    this.props.navigation.setOptions({ title: 'Welcome ' + name + '!' });
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 24 }}>Hello, {name}!</Text>
      </View>
    );
  }
}
