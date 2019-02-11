import React from 'react';
import { ScrollView, RefreshControl,StyleSheet, Text, View } from 'react-native';
import { 
  Provider as PaperProvider, 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  ActivityIndicator,
  HelperText
} from 'react-native-paper';
import { withNavigation } from 'react-navigation';

export default class EventList extends React.Component {

  state = {
    loading: false,
    error: false, 
    result: []
  }

  fetchData = async () => {
    this.state.result = []
    console.log(this.props.gid)
    try {
      const response = await fetch('http://mackays-mbp.wv.cc.cmu.edu:8000/api/getEventList/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'gid=' + this.props.gid
      })
      const eList = await response.json()
      this.setState({eventList: eList.eventList})
      console.log(this.state.eventList)

    } catch (e) {
      this.setState({loading: false, error: true})
    }
  }

  deletePost = async (uid, eid) => {
      console.log(uid)
      console.log(eid)
    try {
      const response = await fetch('http://mackays-mbp.wv.cc.cmu.edu:8000/api/deleteEvent/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'uid=' + uid + '&eid=' + eid
      })
      const resStatus = await response.json()
      console.log(resStatus)
      this.fetchData()
    } catch (e) {
      this.setState({loading: false, error: true})
      this.setState({invalid: true})
    }
  }

  componentWillMount = async () => {
    this.fetchData()
  }

  renderPost = ({loc, desc, eid, initTime, onwer, name}) => {
    return (
      <Card style={styles.card}>
      <Card.Title title={name} />
      <Card.Content>
      <Paragraph>{desc}</Paragraph>
    </Card.Content>
      <Card.Actions>
        <Button disabled icon="place" onPress={() => {}} style={styles.button}>
              {loc}
            </Button>
        <Button disabled icon="timelapse" onPress={() => {}} style={styles.button}>
          {initTime} 
        </Button>
        <Button icon="delete" onPress={() => {
            this.deletePost(this.props.uid, eid)
        }} style={styles.button}>
          Del
        </Button>
        <HelperText
            type="error"
            visible={this.state.invalid}
          >
          You are not the owner of this event!
          </HelperText>
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

    const {loading, error, eventList, infoList, invalid} = this.state
    console.log(eventList)

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
