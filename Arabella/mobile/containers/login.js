import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, ToastAndroid } from 'react-native';
import { requestLogIn } from "../utils/mock-api";
import { SecureStore } from 'expo';
import {Actions} from 'react-native-router-flux';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Text>
            A R A B E L L A
          </Text>
        </View>
        <TextInput
          placeholder='E-Mail'
          style={styles.input}
          onChangeText={(username) => this.setState({username})}
        />
        <TextInput
          placeholder='Hasło'
          style={styles.input}
          onChangeText={(password) => this.setState({password})}
          secureTextEntry={true}
        />
        <Button
          onPress={() => {
            if(!requestLogIn(this.state.username, this.state.password))
              ToastAndroid.show('Błędny e-mail lub hasło!', ToastAndroid.SHORT);
            else {
              SecureStore.setItemAsync('token', requestLogIn(this.state.username, this.state.password));
              ToastAndroid.show('Zalogowano!', ToastAndroid.SHORT);
              Actions.Usermenu();
            }
          }}
          title="Zaloguj"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    backgroundColor:'#efefef',
    padding:10
  },
  input:{
    padding:10, margin: 10,
    borderWidth:1, borderColor:'#ccc'
  }
});

export default Login;