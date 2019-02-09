/* @flow */

import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  type Theme,
} from 'react-native';
import { TextInput, HelperText, withTheme } from 'react-native-paper';

type Props = {
  theme: Theme,
};

type State = {
  text: string,
  name: string,
  outlinedText: string,
};

class TextInputExample extends React.Component<Props, State> {
  static title = 'TextInput';

  state = {
    text: '',
    name: '',
    outlinedText: '',
  };

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
            label="username"
            placeholder="Username"
            value={this.state.username}
            onChangeText={outlinedText => this.setState({ outlinedText })}
          />
          <TextInput
            secureTextEntry={true}
            mode="outlined"
            style={styles.inputContainerStyle}
            label="password"
            value={this.state.password}
            onChangeText={outlinedText => this.setState({ outlinedText })}
          />
          <Button mode="contained" color = "blue" onPress={() => console.log('Pressed')} style ={styles.button1}>
              Sign in
          </Button>
          <Button mode="contained" color = "green" onPress={() => console.log('Pressed')} style = {styles.button2}>
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

export default withTheme(TextInputExample);
