import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { 
  Provider as PaperProvider, Appbar, FAB
} from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import DialogCustom from '../components/DialogCustom';

import GroupList from '../components/GroupList';

class Home extends React.Component {
    static navigationOptions = { header: null }

    state = {
        visible: false
    }

  _onSearch = () => {
      this.props.navigation.push('SearchGroup',{
          uid: this.props.navigation.getParam('uid','EMPTY')
      })
  }

  _onMore = () => console.log('Shown more');

  _openDialog = () => this.setState({ visible: true });

  _closeDialog = () => this.setState({ visible: false });

  searchGroup = async (query) => {
    const uid = this.props.navigation.getParam('uid','EMPTY')
    this.state.result = []
    try {
      const response = await fetch('http://mackays-mbp.wv.cc.cmu.edu:8000/api/search/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'q=' + query
      })
      const gList = await response.json()
      if (gList.list.length > 0) {
        joinGroup(uid, gList.list[0])
      }

    } catch (e) {
      this.setState({loading: false, error: true})
    }
  }

  joinGroup = async (uid,gid) => {
    // const uid = this.props.navigation.getParam('uid','EMPTY')
    this.state.result = []
    try {
      const response = await fetch('http://mackays-mbp.wv.cc.cmu.edu:8000/api/joinOpenGroup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'uid=' + uid + '&gid=' + gid
      })
      const status = await response.json()
      console.log(status)

    } catch (e) {
      this.setState({loading: false, error: true})
    }
  }



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
                    onPress={this._openDialog}
                    />
                </View>
                </SafeAreaView>
                {/* <DialogCustom visible={this.states.visible} close={this._closeDialog} /> */}
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