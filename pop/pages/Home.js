import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { 
  Provider as PaperProvider, Appbar, FAB
} from 'react-native-paper';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import GroupList from '../components/GroupList';

export default class Home extends React.Component {

  _onSearch = () => console.log('Searching');

  _onMore = () => console.log('Shown more');

  render() {
    return (
        <View style={styles.container}>
            <View>
                <Appbar.Header>
                    <Appbar.Content
                    title="Groups"
                    />
                    <Appbar.Action icon="search" onPress={this._onSearch} />
                    <Appbar.Action icon="more-vert" onPress={this._onMore} />
                </Appbar.Header>
            </View>
            <View style={styles.container}>
                <GroupList />
            </View>
            <View>
            <SafeAreaView>
                <View>
                    <FAB
                    icon="add"
                    label="Add Group"
                    style={styles.fab}
                    // onPress={() =>
                    //     this.setState(state => ({ visible: !state.visible }))
                    // }
                    />
                </View>
                </SafeAreaView>
            </View>
        </View> 

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
    margin: 16,
  },
});
