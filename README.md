# Chichat
<div>
<img align=top src="https://res.cloudinary.com/yaponka/image/upload/v1642980370/GitHub/Chichat_home.jpg" width="200">
<img align=top src="https://res.cloudinary.com/yaponka/image/upload/v1642980366/GitHub/Chichat_chat.jpg" width="200">
</div>
[Live demo](https://res.cloudinary.com/yaponka/video/upload/v1643671882/portfolio/Chichat_demo_bxgfyl.mp4)

## Overview
Chichat is a chat app for mobile devices which is developed using React Native and Expo.
The app provides users with features such as a chat interface and let user send images and their location.

## Key Features
* A page where users can enter their name and choose a background color for the chat screen
before joining the chat.
* A page displaying the conversation, as well as an input field and submit button.
* The chat must provide users with two additional communication features: sending images
and location data.
* Data gets stored online and offline.

## Tech Stacks
* [React Native](https://reactnative.dev/)
* [Expo](https://docs.expo.dev/)
* [Firebase Firestore](https://firebase.google.com/)
* [Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat)

## Permissions
When the user decides to send a picture or share their location, the app will ask permission to access the camera roll and/or the user's location. 
Granting the access to the app is necessary for the app to work correctly.
No data gets used or sent without the user's permission. The data is stored locally on the user's device, and synched with the Firestore database when the device goes online. 
The images are stored on Firebase Storage.

## Getting started
### 0. Prerequisites
* Node and npm ([installation steps](https://nodejs.org/en/download/))
* Expo CLI `npm install --global expo-cli`

### 1. Install Dependencies
* From your terminal, navigate to the root folder of the project
* In your terminal, run `npm install`

### 2. Run the App 
* To launch the app run `expo start`
* Expo will start and a browser window will open, that gives you different options to execute the app on a device or emulator

### 3. Set Up a Device
* If you would like to run the app on your mobile device, you'll need to install the Expo app through your device's app store (iOS or Android)
* You will also need an Expo account which can be created via [Expo.io](https://expo.dev/)
* You will need to login into Expo in order to access the App
  - Logging into Expo through the CLI on your machine
  - Logging into Expo on your mobile device in the Expo app
* If you would like to run the app on your machine through a simulator/emulator, you will either need
  - [Android Studio](https://docs.expo.dev/workflow/android-studio-emulator/)
  - [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)
* With your device, scan QR code (Android) or send a link via email (iOS) to connect to Expo
* With a simulator/emulator, press 'a' to run the app with an Android emulator, or press 'i' to run the app with iOS simulator in 'expo start' command
* The app will start on your device and you'll be able to use it
