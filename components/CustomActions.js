import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'

// import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

// Firebase
import firebase from 'firebase';
import firestore from 'firebase';

export default class CustomActions extends Component {

  // getLocation
  getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const result = await Location.getCurrentPositionAsync({}).catch(err => console.log(err));
      const longitude = result.coords.longitude;
      const latitude = result.coords.latitude;
      this.props.onSend({
        location: {
          longitude: longitude,
          latitude: latitude,
        }
      })
    }     
  };

  uploadImageFetch = async (uri) => {
    const blob = await new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        res(xhr.response)
      };
      xhr.onerror = function (err) {
        console.log(err);
        rej(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true)
      xhr.send(null)
    })

    const imageNameBefore = uri.split('/')
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    const ref = firebase.storage().ref().child(`images/${imageName}`)

    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
  }

  onActionPress = () => {
    const options = [
      'Choose from media library',
      'Take Picture',
      'Send Location',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log('user wants to pick am image');
            break;
          case 1:
            console.log('user wants to take a photo');
            break;
          case 2:
            //user wants to share the current location
            this.getLocation();
            break;
          default:
        }
      }
    );
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        accessible={true}
        accessibilityLabel='More action'
        accessibilityHint='Check more action'
        accessibilityRole='button'
        onPress={this.onActionPress}
      >
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTestStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
}