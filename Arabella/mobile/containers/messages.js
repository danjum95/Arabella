import React from 'react';
import {View, Button, ToastAndroid, ActivityIndicator, Text, ImageBackground} from 'react-native';
import styles from '../styles/styles'
import { Actions } from 'react-native-router-flux';

class Messages extends React.Component {

  render() {
    return (
      <ImageBackground source={require('../assets/background.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={{marginTop: 150}}>
          <View style={styles.button}>
            <Button onPress={() => {Actions.Inbox()}} title="Skrzynka odbiorcza" />
          </View>
          <View style={styles.button}>
            <Button onPress={() => {Actions.SendMessage()}} title="Wyślij wiadomość" />
          </View>
        </View>
      </ImageBackground>
    );
  }

}

export default Messages;