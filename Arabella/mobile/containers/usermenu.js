import React from 'react';
import { View, Button, ToastAndroid, ActivityIndicator, Text, ImageBackground } from 'react-native';
import { SecureStore } from "expo";
import { Actions } from 'react-native-router-flux';
import axios from "axios";
import {_env} from "../local/env";
import styles from '../styles/styles'
import { sendRequestSet } from "../utils/token-utils";

class Usermenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      userRole: null,
      userSchool: null
    };
  }

  componentDidMount() {
    sendRequestSet(this.getUserDataFromApi);
  }

  getUserDataFromApi = (token) => {
    const self = this;
    axios.get(_env.API_URL + '/api/users/user/info', {
      headers: { Token: token }
    })
      .then(function (response) {
        self.setState({userInfo: response.data});
      })
      .catch(function (error) {
        ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
        self.userLogout();
      });

    axios.get(_env.API_URL + '/api/users/which/type/of/user', {
      headers: { Token: token }
    })
      .then(function (response) {
        self.setState({userRole: response.data});
      })
      .catch(function (error) {
        ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
      });

    axios.get(_env.API_URL + '/api/users/which/school', {
      headers: { Token: token }
    })
      .then(function (response) {
        self.setState({userSchool: response.data});
      })
      .catch(function (error) {
        ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
      });
  }

  async userLogout() {
    try {
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('refresh-token');
      ToastAndroid.show('Wylogowano!', ToastAndroid.SHORT);
      Actions.Login();
    } catch (error) {
      console.log('SecureStore error: ' + error.message);
    }
  }

  render() {
    if(!(this.state.userInfo && this.state.userSchool)) {
      return (
        <ImageBackground source={require('../assets/background.jpg')} style={{width: '100%', height: '100%'}}>
          <View style={{marginTop: 150}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </ImageBackground>
      );
    }
    else if (this.state.userRole === 1) {
      return (
        <ImageBackground source={require('../assets/background.jpg')} style={{width: '100%', height: '100%'}}>
          <View style={{marginTop: 150}}>
            <View style={styles.button}>
              <Button onPress={() => {Actions.ProfileInfo({userInfo: this.state.userInfo, userRole: this.state.userRole})}} title="Mój profil" />
            </View>
            <View style={styles.button}>
              <Button onPress={() => {Actions.Messages()}} title="Wiadomości" />
            </View>
            <View style={styles.button}>
              <Button onPress={() => {Actions.Calendar({schoolID: this.state.userSchool.id})}} title="Kalendarz" />
            </View>
            <View style={styles.button}>
              <Button onPress={() => {Actions.UsersList({schoolID: this.state.userSchool.id, userRole: this.state.userRole})}} title="Lista Kursantów" />
            </View>
            <View style={styles.button}>
              <Button onPress={this.userLogout} title="Wyloguj" />
            </View>
          </View>
        </ImageBackground>
      );
    }
    else if (this.state.userRole === 2) {
      return (
        <ImageBackground source={require('../assets/background.jpg')} style={{width: '100%', height: '100%'}}>
          <View style={{marginTop: 150}}>
            <View style={styles.button}>
              <Button onPress={() => {Actions.ProfileInfo({userInfo: this.state.userInfo, userRole: this.state.userRole})}} title="Mój profil" />
            </View>
            <View style={styles.button}>
              <Button onPress={() => {Actions.Messages()}} title="Wiadomości" />
            </View>
            <View style={styles.button}>
              <Button onPress={() => {Actions.CalendarReadOnly({schoolID: this.state.userSchool.id})}} title="Kalendarz" />
            </View>
            <View style={styles.button}>
              <Button onPress={() => {Actions.UsersList({schoolID: this.state.userSchool.id, userRole: this.state.userRole})}} title="Lista Instruktorów" />
            </View>
            <View style={styles.button}>
              <Button onPress={this.userLogout} title="Wyloguj" />
            </View>
          </View>
        </ImageBackground>
      );
    }
    else {
      return (
        <ImageBackground source={require('../assets/background.jpg')} style={{width: '100%', height: '100%'}}>
          <View style={{marginTop: 150}}>
            <Text style={{ fontSize: 16, alignSelf: 'center'}}>OSK nie ma dostępu do aplikacji mobilnej</Text>
            <View style={styles.button}>
              <Button onPress={this.userLogout} title="Wyloguj" />
            </View>
          </View>
        </ImageBackground>
      );
    }
  }
}

export default Usermenu;