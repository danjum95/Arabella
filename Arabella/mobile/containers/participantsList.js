import React from 'react';
import { View, FlatList, Text, ToastAndroid} from 'react-native';
import {SecureStore} from "expo";
import axios from 'axios';
import { _env } from "../local/env";
import styles from '../styles/styles'
import {Actions} from "react-native-router-flux";

class ParticipantsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      participants: []
    }
  }

  componentDidMount() {
    console.log(this.props.schoolID);
    let users = this.state.participants;
    SecureStore.getItemAsync('token').then((token) => {
      axios.get(_env.API_URL + '/api/students/of/school/' + this.props.schoolID, {
        headers: { Token: token }
      })
        .then(function (response) {
          console.log(response.data);
          response.data.forEach(user =>{
            let userKeyed = user;
            userKeyed["key"] = user.id.toString();
            users.push(userKeyed);
          })
        }.bind(this))
        .catch(function (error) {
          console.log(error);
          ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
        });
    });
    this.setState({participants: users});
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.participants}
          renderItem={({item}) =>
            <View style={styles.element}>
              <Text style={styles.mainText}>{item.user.name}</Text>
              <Text style={styles.lightText}>{item.user.email}</Text>
            </View>
          }
        />
      </View>
    );
  }
}

export default ParticipantsList;