import React from 'react';
import { View, Button, ToastAndroid, ActivityIndicator, Text } from 'react-native';
import { SecureStore } from "expo";
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { addUserInfo, addUserRole, addUserSchool } from "../actions/userInfoActions";
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
        //props.addUserInfo(response.data);
        self.setState({userInfo: response.data});
      })
      .catch(function (error) {
        console.log(error);
        ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
      });

    axios.get(_env.API_URL + '/api/users/which/type/of/user', {
      headers: { Token: token }
    })
      .then(function (response) {
        //props.addUserRole(response.data);
        self.setState({userRole: response.data});
      })
      .catch(function (error) {
        console.log(error);
        ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
      });

    axios.get(_env.API_URL + '/api/users/which/school', {
      headers: { Token: token }
    })
      .then(function (response) {
        //props.addUserSchool(response.data);
        self.setState({userSchool: response.data});
      })
      .catch(function (error) {
        console.log(error);
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
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    else if (this.state.userRole === 1) {
      return (
        <View style={styles.container}>
          <View style={styles.button}>
            <Button onPress={() => {Actions.ProfileInfo({userInfo: this.state.userInfo, userRole: this.state.userRole})}} title="Mój profil" />
          </View>
          <View style={styles.button}>
            <Button onPress={() => {Actions.Calendar({schoolID: this.state.userSchool.id})}} title="Kalendarz" />
          </View>
          <View style={styles.button}>
            <Button onPress={() => {Actions.ParticipantsList({schoolID: this.state.userSchool.id})}} title="Lista Kursantów" />
          </View>
          <View style={styles.button}>
            <Button onPress={this.userLogout} title="Wyloguj" />
          </View>
        </View>
      );
    }
    else if (this.state.userRole === 2) {
      return (
        <View style={styles.container}>
          <View style={styles.button}>
            <Button onPress={() => {Actions.ProfileInfo({userInfo: this.state.userInfo, userRole: this.state.userRole})}} title="Mój profil" />
          </View>
          <View style={styles.button}>
            <Button onPress={() => {Actions.CalendarReadOnly({schoolID: this.state.userSchool.id})}} title="Kalendarz" />
          </View>
          <View style={styles.button}>
            <Button onPress={this.userLogout} title="Wyloguj" />
          </View>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 16, alignSelf: 'center'}}>OSK nie ma dostępu do aplikacji mobilnej</Text>
          <View style={styles.button}>
            <Button onPress={this.userLogout} title="Wyloguj" />
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addUserInfo,
    addUserRole,
    addUserSchool
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Usermenu);