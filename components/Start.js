import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';

const bgImage = require('../assets/bg.png');
const icon = require('../assets/userIcon.png');

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      bgColor: '',
    };
  }

  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  colors = {
    black: '#090C08',
    purple: '#474056',
    blue: '#8A95A5',
    green: '#B9C6AE',
  };

  render() {
    this.props.navigation.setOptions({ title: 'Chichat' });
    return (
      <View style={styles.container}>
        <ImageBackground
          source={bgImage}
          resizeMode='cover'
          style={styles.image}
        >
          <View>
            <Text style={styles.title}>- Chichat -</Text>
          </View>

          <View style={styles.innerBg}>

            <View style={styles.inputContainer}>
              <Image source={icon} style={styles.icon} />
              <TextInput
                style={styles.input}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder='Your Name'
              />
            </View>

            <View style={styles.colorContainer}>
              <Text style={styles.colorText}>Choose Background Color:</Text>
              <View style={styles.colorWrapper}>
                <TouchableOpacity
                  onPress={() => this.changeBgColor(this.colors.black)}
                >
                  <View style={[styles.circle, styles.black]} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.changeBgColor(this.colors.purple)}
                >
                  <View style={[styles.circle, styles.purple]} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.changeBgColor(this.colors.blue)}
                >
                  <View style={[styles.circle, styles.blue]} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.changeBgColor(this.colors.green)}
                >
                  <View style={[styles.circle, styles.green]} />
                </TouchableOpacity>
              </View>
            </View>
            <Pressable
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('Chats', {
                  name: this.state.name,
                  bgColor: this.state.bgColor,
                })
              }
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
    marginTop: 100,
  },
  innerBg: {
    backgroundColor: '#fff',
    minHeight: 250,
    height: '44%',
    width: '88%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
    borderRadius: 3,
  },
  inputContainer:{
    width: '88%',
    height: 50,
    borderColor: '#757083',
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
    flexDirection: 'row',
  },
  icon: {
    opacity: 0.5
  },
  input: {
    fontSize: 16,
    opacity: 0.8,
    marginLeft: 10
  },
  colorContainer: {
    width: '88%',
  },
  colorText: {
    fontSize: 16,
    color: '#757083',
  },
  colorWrapper: {
    flexDirection: 'row',
    marginTop: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  black: {
    backgroundColor: '#090C08',
  },
  purple: {
    backgroundColor: '#474056',
  },
  blue: {
    backgroundColor: '#8A95A5',
  },
  green: {
    backgroundColor: '#B9C6AE',
  },
  button: {
    backgroundColor: '#757083',
    width: '88%',
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    padding: 20,
  },
});
