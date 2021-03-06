import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { 
  Provider as PaperProvider, 
} from 'react-native-paper';
import Home from './pages/Home';
import Event from './pages/Event'
import Login from './pages/Login'
import Post from './pages/Post'
import SearchGroup from './pages/SearchGroup'
import { createStackNavigator, createAppContainer } from 'react-navigation';

const RootStack = createStackNavigator(
  {
    Home: Home,
    Event: Event,
    Login: Login,
    Post: Post,
    SearchGroup: SearchGroup
  },
  {
    // headerMode: 'screen',
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

AppRegistry.registerComponent('Rootstack', () => Rootstack);