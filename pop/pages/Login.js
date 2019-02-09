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
import { Permissions, Notifications } from 'expo';

const PUSH_ENDPOINT = 'http://hiroshi-ubuntu.wv.cc.cmu.edu:8000/api/updateToken/';

async function registerForPushNotificationsAsync(uid) {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  console.log(uid)
  console.log(token)
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'uid=' + uid + '&token=' + token,
  });
}

class Login extends React.Component{
  static title = 'Login';

  state = {
    loading: false,
    error: false,
    name: '',
    pwd: '',
    uid: '',
    invalid: false,
  };

  register = async () => {

    try {
      const response = await fetch('http://hiroshi-ubuntu.wv.cc.cmu.edu:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'name=' + this.state.name + '&pwd=' + this.state.pwd
      })
      const resUid = await response.json()
      console.log(resUid)
      this.setState({
        uid: resUid.uid, 
        invalid: false
      })
    } catch (e) {
      this.setState({loading: false, error: true})
      this.setState({invalid: true})
    }
  }

  login = async () => {

    try {
      const response = await fetch('http://hiroshi-ubuntu.wv.cc.cmu.edu:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'name=' + this.state.name + '&pwd=' + this.state.pwd
      })
      const resUid = await response.json()
      console.log(resUid)
      this.setState({
        uid: resUid.uid
      })
      registerForPushNotificationsAsync(this.state.uid)
      this.props.navigation.navigate('Home',{
        uid: this.state.uid
      })
    } catch (e) {
      this.setState({loading: false, error: true})
      this.setState({invalid: true})
    }
  }
  
  _isUsernameValid = () => /^[a-zA-Z]*$/.test(this.state.name);
  render() {
    
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
            label="Username, only letters"
            placeholder="Username"
            error={!this._isUsernameValid()}
            value={this.state.name}
            onChangeText={name => this.setState({name, invalid: false})}

          />
          <TextInput
            secureTextEntry={true}
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Password"
            placeholder="Password"
            value={this.state.pwd}
            onChangeText={pwd => this.setState({ pwd, invalid: false})}
          />
          <HelperText
            type="error"
            visible={this.state.invalid}
          >
          Accound and Password do not match!
          </HelperText>
          <Button mode="contained" color = "blue" onPress={() => {
            this.login()
          }} style ={styles.button1}>
              Sign in
          </Button>
          <Button mode="contained" color = "green" onPress={() => {
            this.register()
          }} style = {styles.button2}>
              Sign Up
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

export default withNavigation(Login);