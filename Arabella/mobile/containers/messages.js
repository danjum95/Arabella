import React from 'react';
import { View, Button, ToastAndroid, ActivityIndicator, Text } from 'react-native';
import styles from '../styles/styles'
import { Actions } from 'react-native-router-flux';

class Messages extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Button onPress={() => {Actions.Inbox()}} title="Skrzynka odbiorcza" />
        </View>
        <View style={styles.button}>
          <Button onPress={() => {Actions.SendMessage()}} title="Wyślij wiadomość" />
        </View>
      </View>
    );
  }

}

export default Messages;