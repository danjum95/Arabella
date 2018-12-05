import React from 'react';
import {StyleSheet, View, Button, ToastAndroid} from 'react-native';
import { SecureStore } from "expo";
import {Actions} from 'react-native-router-flux';

class Usermenu extends React.Component {

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
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Button onPress={() => {Actions.ProfileInfo()}} title="Mój profil" />
        </View>
        <View style={styles.button}>
          <Button onPress={() => {Actions.Calendar()}} title="Kalendarz" />
        </View>
        <View style={styles.button}>
          <Button onPress={() => {Actions.ParticipantsList()}} title="Lista Kursantów" />
        </View>
        <View style={styles.button}>
          <Button onPress={this.userLogout} title="Wyloguj" />
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
  button:{
    padding: 5,
    margin: 5
  }
});

export default Usermenu;