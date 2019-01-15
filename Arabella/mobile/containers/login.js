import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, ToastAndroid } from 'react-native';
import { SecureStore } from 'expo';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { _env } from "../local/env";

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
          <Text style={{ fontSize: 32 }}>
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
        <View style={styles.button}>
          <Button
            onPress={() => {
              axios.post(_env.API_URL + '/api/login', {
                email: this.state.username,
                password: this.state.password
              }, {
                headers: { 'Content-Type': 'application/json' }
              })
                .then(function (response) {
                  console.log(response.data['refresh-token']);
                  SecureStore.setItemAsync('token', response.data.token);
                  SecureStore.setItemAsync('refresh-token', response.data['refresh-token']);
                  ToastAndroid.show('Zalogowano!', ToastAndroid.SHORT);
                  Actions.Usermenu();
                })
                .catch(function (error) {
                  ToastAndroid.show('Błędny e-mail lub hasło!', ToastAndroid.SHORT);
                });
            }}
            title="Zaloguj"
          />
        </View>
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
  },
  button:{
    padding: 5,
    margin: 5
  }
});

export default Login;