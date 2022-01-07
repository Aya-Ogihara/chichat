// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//import screens
import Chats from './components/Chats'
import Start from './components/Start'

//import react native gesture handler
import 'react-native-gesture-handler';

//import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Create the navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Start'>
          <Stack.Screen 
            name='Start'
            component={Start}
          />
          <Stack.Screen 
            name='Chats'
            component={Chats}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}


