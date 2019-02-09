import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { 
  Provider as PaperProvider, 
} from 'react-native-paper';
import Home from './pages/Home';
import Event from './pages/Event'
import { createStackNavigator, createAppContainer } from 'react-navigation';

const RootStack = createStackNavigator(
  {
    Home: Home,
    Event: Event,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

AppRegistry.registerComponent('Rootstack', () => Rootstack);