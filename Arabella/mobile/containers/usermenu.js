import React from 'react';
import { View, Button, ToastAndroid, ActivityIndicator } from 'react-native';
import { SecureStore } from "expo";
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { addUserInfo, addUserRole, addUserSchool } from "../actions/userInfoActions";
import axios from "axios";
import {_env} from "../local/env";
import styles from '../styles/styles'

class Usermenu extends React.Component {

  componentWillMount() {
    this.getDataFromApi();
  }

  getDataFromApi() {
    SecureStore.getItemAsync('token').then((token) => {
      axios.get(_env.API_URL + '/api/users/user/info', {
        headers: { Token: token }
      })
        .then(function (response) {
          this.props.addUserInfo(response.data);
        }.bind(this))
        .catch(function (error) {
          console.log(error);
          ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
        });

      axios.get(_env.API_URL + '/api/users/which/type/of/user', {
        headers: { Token: token }
      })
        .then(function (response) {
          this.props.addUserRole(response.data);
        }.bind(this))
        .catch(function (error) {
          console.log(error);
          ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
        });

      axios.get(_env.API_URL + '/api/users/which/school', {
        headers: { Token: token }
      })
        .then(function (response) {
          this.props.addUserSchool(response.data);
        }.bind(this))
        .catch(function (error) {
          console.log(error);
          ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
        });
    });
  }

  async userLogout() {
    try {
      await SecureStore.deleteItemAsync('token');
      ToastAndroid.show('Wylogowano!', ToastAndroid.SHORT);
      Actions.Login();
    } catch (error) {
        console.log('SecureStore error: ' + error.message);
    }
  }


  render() {
    console.log(this.props.user);
    if(!this.props.user.get('school')) {
      setTimeout(() => { console.log('pop'); Actions.pop(); }, 5000);
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <View style={styles.button}>
            <Button onPress={() => {Actions.ProfileInfo()}} title="Mój profil" />
          </View>
          <View style={styles.button}>
            <Button onPress={() => {Actions.Calendar({schoolID: this.props.user.get('school').id})}} title="Kalendarz" />
          </View>
          <View style={styles.button}>
            <Button onPress={() => {Actions.ParticipantsList({schoolID: this.props.user.get('school').id})}} title="Lista Kursantów" />
          </View>
          <View style={styles.button}>
            <Button onPress={this.userLogout} title="Wyloguj" />
          </View>
        </View>
      );
    }
  }
}


const mapStateToProps = (state) => {
  const { user } = state;
  return { user }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addUserInfo,
    addUserRole,
    addUserSchool
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Usermenu);