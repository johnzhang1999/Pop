import React from 'react';
import { ScrollView, RefreshControl,StyleSheet, Text, View } from 'react-native';
import { 
  Provider as PaperProvider, 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  ActivityIndicator,
  Chip
} from 'react-native-paper';
import { withNavigation } from 'react-navigation';

export default class EventList extends React.Component {

  state = {
    loading: false,
    error: false, 
    eventList: [],
    infoList: [],
    uid: 'eea7aa99-2e43-4d41-89df-5b320c35da3e',
  }

  loadUid = async () => {
    try {
      const uid = await AsyncStorage.getItem('uid')

      if (uid !== null) {
        this.setState({uid})
      }
    } catch (e) {
      console.error('Failed to load uid.')
    }
  }

  saveUid = async (uid) => {
    try {
      await AsyncStorage.setItem('uid', uid)

      this.setState({uid})
    } catch (e) {
      console.error('Failed to save uid.')
    }
  }

  fetchData = async () => {
    this.state.eventList = []
    this.state.infoList = []
    try {
      const response = await fetch('http://hiroshi-ubuntu.wv.cc.cmu.edu:8000/api/getEventList/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'gid=' + this.state.gid
      })
      const gList = await response.json()
      this.setState({eventList: gList.eventList})

      for (g in this.state.eventList) {

        try {
          const response = await fetch('http://hiroshi-ubuntu.wv.cc.cmu.edu:8000/api/getEventInfo/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'eid=' + this.state.eventList[g]
          }
          )
          const info = await response.json()
            
          this.setState({
            infoList: [...this.state.infoList, info]  
          })

        } catch (e) {
          this.setState({loading: false, error: true})
        }
      }
    } catch (e) {
      this.setState({loading: false, error: true})
    }
  }

  componentWillMount = async () => {
    this.fetchData()
  }

  renderPost = ({gid, memberList, name, owner, type, unconfirmed}) => {
    typeBtn = type === "private" ? "lock" : "accessibility"
    pplCount = memberList.length
    return (
      <Card style={styles.card}>
      <Card.Title title={name} />
      <Card.Actions>
        <Button disabled icon={typeBtn} onPress={() => {}} style={styles.button}>
              {type}
            </Button>
        <Button disabled icon="announcement" onPress={() => {}} style={styles.button}>
          {unconfirmed} 
        </Button>
        <Button disabled icon="people" onPress={() => {}} style={styles.button}>
          {pplCount} 
        </Button>
      </Card.Actions>
    </Card>
    )
  } 

  _onRefresh = () => {
    this.setState({loading: true});
    this.fetchData().then(() => {
      this.setState({loading: false});
    });
  }

  render() {

    const {loading, error, eventList, infoList, uid} = this.state


    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }

    if (error) {
      return (
        <View style={styles.center}>
          <Text>
            Failed to load groups!
          </Text>
        </View>
      )
    }

    return (

            <ScrollView style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={this.state.loading} 
          onRefresh={this._onRefresh}
        />
      }>
        {infoList.map(this.renderPost)} 
      </ScrollView>


    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: 4,
    padding: 4,
  },
  button: {
    margin: 0
  }
});
