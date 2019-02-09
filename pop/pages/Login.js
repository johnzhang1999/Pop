
import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  type Theme,
  Container,

} from 'react-native';
import { Button, TextInput, HelperText, withTheme } from 'react-native-paper';


type State = {
  name: string,
  pwd: string,
};

export default class TextInputExample extends React.Component<State>{
  static title = 'Login';

  state = {
    loading: false
    error: false
    name: '',
    pwd: '',
  };

  fetchData = async () => {
    this.state.groupList = []
    this.state.infoList = []
    try {
      const response = await fetch('http://hiroshi-ubuntu.wv.cc.cmu.edu:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'name=' + this.state.name + '&pwd=' + this.state.pwd
      })
    } catch (e) {
      this.setState({loading: false, error: true})
    }
  }

  getData = async () => {
    this.state.groupList = []
    this.state.infoList = []
    try {
      const response = await fetch('http://hiroshi-ubuntu.wv.cc.cmu.edu:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'name=' + this.state.name + '&pwd=' + this.state.pwd
      })
    } catch (e) {
      this.setState({loading: false, error: true})
    }
  }

  _isUsernameValid = () => /^[a-zA-Z]*$/.test(this.state.name);

  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    return (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior="padding"
        keyboardVerticalOffset={80}
      >
        <ScrollView
          style={[styles.container, { backgroundColor: background }]}
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
            onChangeText={name => this.setState({ name })}
          />
          <TextInput
            secureTextEntry={true}
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Password"
             placeholder="Password"
            value={this.state.pwd}
            onChangeText={pwd => this.setState({ pwd })}
          />
          <Button mode="contained" color = "blue" onPress={() => componentWillMount = async () => {
            this.getData()
          }} style ={styles.button1}>
              Sign in
          </Button>
          <Button mode="contained" color = "green" onPress={() => componentWillMount = async () => {
            this.fetchData()
          }} style = {styles.button2}>
              Sign Up
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
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

