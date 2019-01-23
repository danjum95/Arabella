import React from 'react';
import {View, FlatList, Text, ToastAndroid, ImageBackground, TextInput} from 'react-native';
import axios from 'axios';
import { _env } from "../local/env";
import styles from '../styles/styles'
import {sendRequestSet} from "../utils/token-utils";

class UsersList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filterQueue: ''
    }
  }

  componentDidMount() {
    if(this.props.userRole === 1)
      sendRequestSet(this.getParticipantsFromApi);
    else if(this.props.userRole === 2)
      sendRequestSet(this.getInstructorsFromApi);
  }

  getParticipantsFromApi = (token) => {
    const self = this;
    axios.get(_env.API_URL + '/api/students/of/school/' + this.props.schoolID, {
      headers: { Token: token }
    })
      .then(function (response) {
        console.log(response.data);
        response.data.forEach(element =>{
          const elementWithKey = element;
          elementWithKey["key"] = element.id.toString();
          elementWithKey["fullNameData"] = element.user.name + ' - ' + element.user.email;
          self.setState(prevState => ({
            users: [...prevState.users, elementWithKey]
          }))
        })
      }.bind(this))
      .catch(function (error) {
        ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
      });
  };

  getInstructorsFromApi = (token) => {
    const self = this;
    axios.get(_env.API_URL + '/api/instructors/of/school/' + this.props.schoolID, {
      headers: { Token: token }
    })
      .then(function (response) {
        console.log(response.data);
        response.data.forEach(element =>{
          const elementWithKey = element;
          elementWithKey["key"] = element.id.toString();
          elementWithKey["fullNameData"] = element.user.name + ' - ' + element.user.email;
          self.setState(prevState => ({
            users: [...prevState.users, elementWithKey]
          }))
        })
      }.bind(this))
      .catch(function (error) {
        ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
      });
  };

  filterUsersArray = (array) => {
    const filteredArray = [];
    array.forEach(element => {
      if(element.fullNameData.includes(this.state.filterQueue))
        filteredArray.push(element);
    });
    return filteredArray;
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholderTextColor='#888'
          placeholder='Filtruj...'
          style={styles.input}
          onChangeText={(filterQueue) => this.setState({filterQueue})}
          value={this.state.filterQueue}
        />
        <FlatList
          data={this.filterUsersArray(this.state.users)}
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

export default UsersList;