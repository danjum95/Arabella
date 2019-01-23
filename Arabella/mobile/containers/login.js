import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, ToastAndroid, ImageBackground, Image } from 'react-native';
import { SecureStore } from 'expo';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { _env } from "../local/env";
import styles from '../styles/styles';

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
      <ImageBackground source={require('../assets/background.jpg')} style={{width: '100%', height: '100%'}}>
        <View >
          <View style={{alignItems: 'center', marginTop: 150}}>
            <Text style={{ fontSize: 32 }}>
              A R A B E L L A
            </Text>
          </View>
          <TextInput
            placeholderTextColor='#888'
            placeholder='E-Mail'
            style={styles.input}
            onChangeText={(username) => this.setState({username: username.replace(/\s/g, '')})}
            value={this.state.username}
            autoCapitalize='none'
          />
          <TextInput
            placeholderTextColor='#888'
            placeholder='Hasło'
            style={styles.input}
            onChangeText={(password) => this.setState({password: password.replace(/\s/g, '')})}
            secureTextEntry={true}
            value={this.state.password}
            autoCapitalize='none'
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
      </ImageBackground>
    );
  }
}

export default Login;