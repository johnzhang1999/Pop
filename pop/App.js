import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { 
  Provider as PaperProvider, 
} from 'react-native-paper';
import Home from './pages/Home';

export default class App extends React.Component {
  render() {
    return (
      <PaperProvider> 
        <Home />
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('main', () => Main);