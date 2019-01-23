import React from 'react';
import {Button, FlatList, Modal, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import styles from '../styles/styles'
import axios from "axios";
import {_env} from "../local/env";
import {sendRequestSet} from "../utils/token-utils";

class Inbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],

      senderEmail: null,
      message: null,

      modalVisible: false
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount() {
    sendRequestSet(this.getMessagesFromApi);
  }

  getMessagesFromApi = (token) => {
    const self = this;
    axios.get(_env.API_URL + '/api/messages', {
      headers: { Token: token }
    })
      .then(function (response) {
        response.data.forEach(element =>{
          const elementWithKey = element;
          elementWithKey["key"] = element.id.toString();
          self.setState(prevState => ({
            messages: [...prevState.messages, elementWithKey]
          }))
        });
      })
      .catch(function (error) {
        console.log(JSON.stringify(error.message));
        ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
      });
  };

  dateToOutput(date) {
    const timeString = date.toLocaleTimeString();
    let month;
    if((date.getMonth() + 1).toString().length === 1)
      month = '0' + (date.getMonth() + 1).toString();
    else
      month = (date.getMonth() + 1).toString();
    return timeString.split(':')[0] + ':' + timeString.split(':')[1] + ' ' +
      date.getDate() + '-' + month + '-' + date.getFullYear();
  }

  renderMessageModal() {
    return (
      <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} onRequestClose={() => {
        this.setState({senderEmail: null, message: null}, () => { this.setModalVisible(false) });
      }}>
        <View style={styles.messageView}>
          <Text>Od: {this.state.senderEmail}</Text>
          <View style={styles.messageFlexBox}>
            <Text>
              {this.state.message}
            </Text>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderMessageModal()}
        <Text style={{marginTop: 15}}>
          Skrzynka odbiorcza ({this.state.messages.length}):
        </Text>
        <FlatList
          data={this.state.messages}
          renderItem={({item}) =>
            <TouchableOpacity onPress={() => {
              this.setState({senderEmail: item.sender.email, message: item.message}, this.setModalVisible(true));
            }} style={styles.element}>
              <Text style={styles.mainText}>Od: {item.sender.firstName + ' ' + item.sender.lastName}</Text>
              <Text style={styles.lightText}>{this.dateToOutput(new Date(item.timestamp))}</Text>
            </TouchableOpacity>
          }
        />
      </View>
    );
  }

}

export default Inbox;