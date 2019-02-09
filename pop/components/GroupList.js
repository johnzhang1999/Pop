import React from 'react';
import { ActivityIndicator, ScrollView, RefreshControl,StyleSheet, Text, View } from 'react-native';
import { 
  Provider as PaperProvider, 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  Avatar,
} from 'react-native-paper';

export default class GroupList extends React.Component {

  state = {
    loading: false,
    error: false, 
    groupList: [],
    infoList: [],
    uid: 'eea7aa99-2e43-4d41-89df-5b320c35da3e'
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

  componentWillMount = async () => {
    try {
      const response = await fetch('http://hiroshi-ubuntu.wv.cc.cmu.edu:8000/api/getGroupList/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'uid=' + this.state.uid
      })
      const gList = await response.json()

      this.setState({groupList: gList.groupList})
      // console.log(this.state.groupList)

      for (g in this.state.groupList) {
        // console.log(g)
        // console.log(this.state.groupList[g])
        try {
          const response = await fetch('http://hiroshi-ubuntu.wv.cc.cmu.edu:8000/api/getGroupInfo/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'gid=' + this.state.groupList[g]
          }
          )
          const info = await response.json()
          this.setState({
            infoList: [...this.state.infoList, info]  
          })

          console.log(this.state.infoList)

        } catch (e) {
          this.setState({loading: false, error: true})
        }
      }

    } catch (e) {
      this.setState({loading: false, error: true})
    }
  }

  renderPost = ({gid, name, type, memberList, owner, unconfirmed}) => {
    return (
      <Card>
      <Card.Title title={name} />
      <Card.Content>
        <Title>{name}</Title>
      </Card.Content>
      <Card.Actions>
        <Chip>{type} group</Chip>
        <Chip>{unconfirmed} unconfirmed</Chip>
      </Card.Actions>
    </Card>
    )
  }

  // _onRefresh = () => {
  //   this.setState({loading: true});
  //   componentWillMount().then(() => {
  //     this.setState({loading: false});
  //   });
  // }

  render() {

    const {loading, error, groupList, infoList, uid} = this.state

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

      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={this.state.loading}
          // onRefresh={this._onRefresh}
        />
      }>
        {infoList.map(this.renderPost)} 
        {/* <Text>Hello</Text> */}
      </ScrollView>

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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
