import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { 
  Provider as PaperProvider, Appbar, FAB
} from 'react-native-paper';
import { withNavigation } from 'react-navigation';

import GroupList from '../components/GroupList';

class Home extends React.Component {
    static navigationOptions = { header: null }
  _onSearch = () => {
      this.props.navigation.push('SearchGroup',{
          uid: this.props.navigation.getParam('uid','EMPTY')
      })
  }

  _onMore = () => console.log('Shown more');

  render() {
    const { navigation } = this.props;
    const uid = navigation.getParam('uid','EMPTY')
    return (
        <PaperProvider> 
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
                <GroupList uid={uid}/>
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
        </PaperProvider>
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

export default withNavigation(Home);