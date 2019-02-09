import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Theme,
  Container,

} from 'react-native';
import { Button, TextInput, HelperText, withTheme, Paragraph } from 'react-native-paper';
import { withNavigation } from 'react-navigation';

class Post extends React.Component{
  static navigationOptions = { header: null }
  static title = 'Post';

  state = {
    loading: false,
    error: false,
    name: '',
    desc: '',
    loc: ''
  };


  addEvent = async (gid,uid,name,desc,loc) => {
    try {
      const response = await fetch('http://hiroshi-ubuntu.wv.cc.cmu.edu:8000/api/addEvent/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'gid=' + gid + '&uid=' + uid + '&name=' + name + '&desc=' + desc + '&loc=' + loc
      })
      console.log(response)
      const resEid = await response.json()
      console.log(resEid)
    //   this.setState({
    //     post: 
    //   })
    this.props.navigation.navigate('Event', {
        gid: gid,
        uid: uid
      });
    } catch (e) {
      console.log("error")
      this.setState({loading: false, error: true})
    }
  }


  render() {
    // const {
    //   theme: {
    //     colors: { background },
    //   },
    // } = this.props;
    const { navigation } = this.props;
    const gid = navigation.getParam('gid','EMPTY')
    const uid = navigation.getParam('uid','EMPTY')
    console.log("INFO!")
    console.log(gid)
    console.log(uid)

    return (
      <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior="padding"
        keyboardVerticalOffset={80}
      >
        <ScrollView
          style={[styles.container]}
          keyboardShouldPersistTaps={'always'}
          removeClippedSubviews={false}
        >
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Event"
            placeholder="What's exciting?"
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
          />
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Description"
            placeholder="Describe your event"
            value={this.state.desc}
            onChangeText={desc => this.setState({ desc })}
          />
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Location"
            placeholder="Where?"
            value={this.state.loc}
            onChangeText={loc => this.setState({ loc })}
          />
          <Button mode="contained" color="blue" onPress={() => {
            this.addEvent(gid,uid,this.state.name,this.state.desc,this.state.loc)
            console.log("Requiest sent!")
          }} style ={styles.button1}>
              POP!
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  wrapper: {
    flex: 1,
  },
  inputContainerStyle: {
    margin: 8,
  },
  button1:{
    backgroundColor: '#4169E1',
    margin: 8,
    borderWidth: 5,
    borderRadius: 15 
  },
  button2:{
    backgroundColor: '#32CD32',
    margin: 8,
    borderWidth: 5,
    borderRadius: 15 
  }
});

export default withNavigation(Post);