import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { 
  Provider as PaperProvider, Appbar, FAB
} from 'react-native-paper';
import { withNavigation } from 'react-navigation';

import EventList from '../components/EventList';

class Event extends React.Component {
    static navigationOptions = { header: null }

  _onSearch = () => console.log('Searching');

  _onMore = () => console.log('Shown more');

  render() {
    const { navigation } = this.props;
    const gid = navigation.getParam('gid','EMPTY')
    const uid = navigation.getParam('uid','EMPTY')
    // console.log(gid)
    return (
        <View style={styles.container}>
            <View>
                <Appbar.Header>
                <Appbar.BackAction
          onPress={() => this.props.navigation.goBack()}
        />
                    <Appbar.Content
                    title="Events"
                    />
                    <Appbar.Action icon="search" onPress={this._onSearch} />
                    <Appbar.Action icon="more-vert" onPress={this._onMore} />
                </Appbar.Header>
            </View>
            <View style={styles.container}>
                <EventList gid={gid} uid={uid}/>
            </View>
            <View>
            <SafeAreaView>
                <View>
                    <FAB
                    icon="add"
                    label="Add Event"
                    style={styles.fab}
                    onPress={() => {
                        this.props.navigation.navigate('Post', {
                            uid: uid,
                            gid: gid
                        })
                    }
                    }
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

export default withNavigation(Event);