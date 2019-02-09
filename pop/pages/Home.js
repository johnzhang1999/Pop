import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { 
  Provider as PaperProvider, 
} from 'react-native-paper';

import GroupList from '../components/GroupList';

export default class Home extends React.Component {
  render() {
    return (
        <GroupList />
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
