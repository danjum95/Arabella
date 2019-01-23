import React from 'react';
import {View, Button, ToastAndroid, ImageBackground} from 'react-native';
import styles from '../styles/styles'
import { Actions } from 'react-native-router-flux';
import {SecureStore} from "expo";

class InstructorView extends React.Component {

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
    return (
      <ImageBackground source={require('../assets/background.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={{marginTop: 150}}>
          <View style={styles.button}>
            <Button onPress={() => {Actions.ProfileInfo({userInfo: this.props.userInfo, userRole: this.props.userRole})}} title="Mój profil" />
          </View>
          <View style={styles.button}>
            <Button onPress={() => {Actions.Messages()}} title="Wiadomości" />
          </View>
          <View style={styles.button}>
            <Button onPress={() => {Actions.Calendar({schoolID: this.props.userSchool.id})}} title="Kalendarz" />
          </View>
          <View style={styles.button}>
            <Button onPress={() => {Actions.UsersList({schoolID: this.props.userSchool.id, userRole: this.props.userRole})}} title="Lista Kursantów" />
          </View>
          <View style={styles.button}>
            <Button onPress={this.userLogout} title="Wyloguj" />
          </View>
        </View>
      </ImageBackground>
    );
  }

}

export default InstructorView;