import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Button, ToastAndroid} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addEvent } from '../actions/calendarActions';
import Autocomplete from "react-native-autocomplete-input";
import {requestEvents, requestParticipants} from "../utils/mock-api";
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Actions} from "react-native-router-flux";
import {SecureStore} from "expo";
import axios from "axios";
import {_env} from "../local/env";

class AddEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      usersData: [],
      participants: [],
      from: '00:00',
      to: '00:00',
      isFromTimePickerVisible: false,
      isToTimePickerVisible: false
    };
  }

  _showFromTimePicker = () => this.setState({ isFromTimePickerVisible: true });
  _showToTimePicker = () => this.setState({ isToTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isFromTimePickerVisible: false, isToTimePickerVisible: false });

  _handleFromDatePicked = (date) => {
    const datetime = new Date(date).toLocaleTimeString();
    this.setState({from: datetime.split(':')[0] + ':' + datetime.split(':')[1] });
    this._hideDateTimePicker();
  };

  _handleToDatePicked = (date) => {
    const datetime = new Date(date).toLocaleTimeString();
    this.setState({to: datetime.split(':')[0] + ':' + datetime.split(':')[1] });
    this._hideDateTimePicker();
  };

  componentDidMount() {
    let element, users = this.state.usersData, participants = this.state.participants;
    SecureStore.getItemAsync('token').then((token) => {
      axios.get(_env.API_URL + '/api/students/of/school/' + this.props.schoolID, {
        headers: { Token: token }
      })
        .then(function (response) {
          console.log(response.data);
          response.data.forEach(user =>{
            element = user.user.name + ' - ' + user.user.email;
            participants.push(user);
            users.push(element);
          })
        }.bind(this))
        .catch(function (error) {
          console.log(error);
          ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
        });
    });
    this.setState({usersData: users, participants: participants});
  }

  findUser(query) {
    if (query === '') {
      return [];
    }

    const { usersData } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return usersData.filter(user => user.search(regex) >= 0);
  }

  render() {
    const users = this.findUser(this.state.user);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <View style={styles.container}>

        <View style={styles.autoFillInput}>
          <Autocomplete
            data={users.length === 1 && comp(this.state.user, users[0]) ? [] : users}
            defaultValue={this.state.user}
            onChangeText={text => this.setState({ user: text })}
            renderItem={item => (
              <TouchableOpacity onPress={() => this.setState({ user: item })}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            placeholder="Wyszukaj kursanta"
          />
        </View>

        <View style={styles.timepickerFrom}>
          <Text style={styles.mainText}>
            Od godziny:
          </Text>
          <TouchableOpacity onPress={this._showFromTimePicker}>
            <Text style={styles.lightText}>
              {' ' + this.state.from}
            </Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.isFromTimePickerVisible}
            onConfirm={this._handleFromDatePicked}
            onCancel={this._hideDateTimePicker}
            mode='time'
          />
        </View>

        <View style={styles.timepickerTo}>
          <Text style={styles.mainText}>
            Do godziny:
          </Text>
          <TouchableOpacity onPress={this._showToTimePicker}>
            <Text style={styles.lightText}>
              {' ' + this.state.to}
            </Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.isToTimePickerVisible}
            onConfirm={this._handleToDatePicked}
            onCancel={this._hideDateTimePicker}
            mode='time'
          />
        </View>

        <View style={styles.button}>
          <Button
            onPress={() => {
              SecureStore.getItemAsync('token').then((token) => {
                axios.put(_env.API_URL + '/api/lessons', {
                  headers: { Token: token },
                  Lesson: {
                    studentId: null,
                    startDate: null,
                    endDate: null
                  }
                })
                  .then(function (response) {
                    console.log(response.data);
                    response.data.forEach(user =>{
                      element = user.user.name + ' - ' + user.user.email;
                      participants.push(user);
                      users.push(element);
                    })
                  }.bind(this))
                  .catch(function (error) {
                    console.log(error);
                    ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
                  });
              });

              let jsondata = {};
              jsondata[this.props.eventDay.dateString] = [{
                name: 'Testowe Jazdy',
                height: 100,
                from: this.state.from,
                to: this.state.to,
                participant: this.state.user.split('-')[0]
              }];
              this.props.addEvent(jsondata);
              Actions.pop();
            }}
            title="Dodaj jazdy"
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#efefef',
    padding:10,
  },
  autoFillInput:{
    flex:1,
    marginTop: 50
  },
  timepickerFrom:{
    flex:1,
    marginTop: 80,
    justifyContent:'center'
  },
  timepickerTo:{
    flex:1,
    justifyContent:'center'
  },
  button:{
    padding: 5,
    margin: 5
  },
  lightText: {
    fontSize: 20,
    color: 'darkgrey',
    fontWeight: 'bold'
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 20
  }
});

const mapStateToProps = (state) => {
  const { calendarEvents } = state;
  return { calendarEvents }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addEvent,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);