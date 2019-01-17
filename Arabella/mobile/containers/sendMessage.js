import React from 'react';
import { View, TouchableOpacity, ToastAndroid, Button, Text, TextInput } from 'react-native';
import styles from '../styles/styles'
import { Actions } from 'react-native-router-flux';
import axios from "axios";
import {_env} from "../local/env";
import { sendRequestSet } from "../utils/token-utils";
import Autocomplete from "react-native-autocomplete-input";

class SendMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messageTo: null,
      locked: false,
      query: '',

      messageableUsers: []
    };
  }

  componentDidMount() {
    sendRequestSet(this.getMessageableUsers);
  }

  getMessageableUsers = (token) => {
    const self = this;
    axios.get(_env.API_URL + '/api/messages/users', {
      headers: { Token: token }
    })
      .then(function (response) {
        response.data.forEach(element =>{
          const elementWithKey = element;
          elementWithKey["key"] = element.id.toString();
          elementWithKey["userString"] = element.firstName + ' ' + element.lastName + ' - ' + element.email;
          self.setState(prevState => ({
            messageableUsers: [...prevState.messageableUsers, elementWithKey]
          }))
        });
      })
      .catch(function (error) {
        console.log(JSON.stringify(error.message));
        ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
      });
  };

  sendMessage = (token) => {
    const self = this;
    axios.put(_env.API_URL + '/api/messages', {
      receiverId: self.state.messageTo.id,
      message: self.state.message
    }, { headers: { Token: token }
    })
      .then(function (response) {
        ToastAndroid.show('Wysłano wiadomość!', ToastAndroid.SHORT);
        Actions.Usermenu();
      })
      .catch(function (error) {
        console.log(JSON.stringify(error.message));
        ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
      });
  };

  parseMessageTo(to) {
    if(!to)
      return '...';
    else
      return to.userString;
  }

  findUser(query) {
    if (query === '') {
      return [];
    }

    const { messageableUsers } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return messageableUsers.filter(user => user.userString.search(regex) >= 0);
  }

  render() {
    const messageableUsers = this.findUser(this.state.query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <View style={styles.containerTopContent}>
        <View style={styles.subElement}>
          <Text style={styles.messageToText}>Do: {this.parseMessageTo(this.state.messageTo)}</Text>
        </View>
        {!this.state.locked &&
        <View style={styles.autoFillInput}>
          <Autocomplete
            data={messageableUsers.length === 1 && comp(this.state.query, messageableUsers[0].userString) ? [] : messageableUsers}
            defaultValue={this.state.query}
            onChangeText={text => this.setState({ query: text })}
            renderItem={item => (
              <TouchableOpacity onPress={() => this.setState({ query: item.userString, messageTo: item })}>
                <Text>{item.userString}</Text>
              </TouchableOpacity>
            )}
            placeholder="Wyszukaj odbiorcę..."
          />
        </View>}
        {!this.state.locked &&
        <View style={styles.button}>
          <Button title="Dalej" onPress={() => {
            if(this.state.messageTo)
              this.setState({locked: true});
            else
              ToastAndroid.show('Nie wybrano odbiorcy!', ToastAndroid.SHORT);
          }}/>
        </View>}
        {this.state.locked &&
        <View style={styles.containerTopContent}>
          <View style={styles.messageFlexBox}>
            <View style={{
              borderBottomColor: '#6dbaf2',
              borderBottomWidth: 1 }}>
              <TextInput
                editable={true}
                multiline={true}
                onChangeText={(message) => this.setState({message})}
                value={this.state.message}
              />
            </View>
          </View>
          <View style={styles.button}>
            <Button title="Wyślij" onPress={() => {
              if(this.state.message === '')
                ToastAndroid.show('Wiadomość jest pusta!', ToastAndroid.SHORT);
              else
                sendRequestSet(this.sendMessage);
            }}/>
          </View>
          <View style={styles.button}>
            <Button title="Zmień odbiorcę" onPress={() => { this.setState({locked: false}); }}/>
          </View>
        </View>
        }
      </View>
    );
  }

}

export default SendMessage;