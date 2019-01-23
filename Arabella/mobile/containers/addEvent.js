import React from 'react';
import {Text, View, TouchableOpacity, Button, ToastAndroid} from 'react-native';
import Autocomplete from "react-native-autocomplete-input";
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Actions} from "react-native-router-flux";
import axios from "axios";
import {_env} from "../local/env";
import styles from '../styles/styles';
import {sendRequestSet} from "../utils/token-utils";

class AddEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      students: [],

      query: '',
      selection: null,
      locked: false,

      from: '00:00',
      to: '00:00'
    };
  }

  componentDidMount() {
    sendRequestSet(this.getStudentsForEvent)
  }

  getStudentsForEvent = (token) => {
    const self = this;
    axios.get(_env.API_URL + '/api/students/of/school/' + self.props.schoolID, {
      headers: { Token: token }
    })
      .then(function (response) {
        response.data.forEach(element =>{
          const elementWithKey = element;
          elementWithKey["key"] = element.id.toString();
          elementWithKey["userString"] = element.user.firstName + ' ' + element.user.lastName + ' - ' + element.user.email;
          self.setState(prevState => ({
            students: [...prevState.students, elementWithKey]
          }))
        });
      })
      .catch(function (error) {
        console.log(JSON.stringify(error.message));
        ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
      });
  };

  addLesson = (token) => {
    const self = this;
    axios.put(_env.API_URL + '/api/lessons', {
      studentId: self.state.selection.userId,
      date: self.props.eventDay.dateString + 'T' + self.state.from + ':00',
      endDate: self.props.eventDay.dateString + 'T' + self.state.to + ':00'
    }, { headers: { Token: token }
    })
      .then(function (response) {
        ToastAndroid.show('Dodano jazdy!', ToastAndroid.SHORT);
        Actions.Usermenu();
      })
      .catch(function (error) {
        console.log(JSON.stringify(error.message));
        console.log(JSON.stringify(error.response));
        ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
      });
  };

  parseSelection(selection) {
    if(!selection)
      return '...';
    else
      return selection.user.firstName + ' ' + selection.user.lastName;
  }

  hourToNumber(time) {
    return [Number(time.split(':')[0]), Number(time.split(':')[1])];
  }

  findUser(query) {
    if (query === '') {
      return [];
    }

    const { students } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return students.filter(student => student.userString.search(regex) >= 0);
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

  renderStudentSelection() {
    return (
      <View style={styles.element}>
        <Text style={styles.mainText}>Kursant:</Text>
        <Text style={styles.lightText}>{this.parseSelection(this.state.selection)}</Text>
      </View>
    );
  }

  renderFromHourSelection() {
    return (
      <View style={styles.element}>
        <Text style={styles.mainText}>Od godziny:</Text>
        <TouchableOpacity onPress={this._showFromTimePicker}>
          <Text style={styles.lightText}>{this.state.from}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isFromTimePickerVisible}
          onConfirm={this._handleFromDatePicked}
          onCancel={this._hideDateTimePicker}
          mode='time'
        />
      </View>
    );
  }

  renderToHourSelection() {
    return (
      <View style={styles.element}>
        <Text style={styles.mainText}>Do godziny:</Text>
        <TouchableOpacity onPress={this._showToTimePicker}>
          <Text style={styles.lightText}>{this.state.to}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isToTimePickerVisible}
          onConfirm={this._handleToDatePicked}
          onCancel={this._hideDateTimePicker}
          mode='time'
        />
      </View>
    );
  }

  render() {
    const students = this.findUser(this.state.query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <View style={styles.containerTopContent}>
        {this.renderStudentSelection()}
        {this.renderFromHourSelection()}
        {this.renderToHourSelection()}
        {!this.state.locked &&
        <View style={styles.autoFillInput}>
          <Autocomplete
            data={students.length === 1 && comp(this.state.query, students[0].userString) ? [] : students}
            defaultValue={this.state.query}
            onChangeText={text => this.setState({ query: text })}
            renderItem={item => (
              <TouchableOpacity onPress={() => this.setState({ query: item.userString, selection: item })}>
                <Text>{item.userString}</Text>
              </TouchableOpacity>
            )}
            placeholder="Wyszukaj kursanta..."
          />
        </View>}
        {!this.state.locked &&
        <View style={styles.button}>
          <Button title="Dalej" onPress={() => {
            if(this.state.selection)
              this.setState({locked: true});
            else
              ToastAndroid.show('Nie wybrano kursanta!', ToastAndroid.SHORT);
          }}/>
        </View>}
        {this.state.locked &&
        <View style={styles.containerTopContent}>
          <View style={styles.button}>
            <Button title="Dodaj jazdy" onPress={() => {
              const from = this.hourToNumber(this.state.from);
              const to = this.hourToNumber(this.state.to);
              if((from[0] > to[0]) || (from[0] === to[0] && from[1] > to[1]) || (from[0] === to[0] && from[1] === to[1]))
                ToastAndroid.show('Godzina zakończenia musi być późniejsza niż godzina rozpoczęcia!', ToastAndroid.SHORT);
              else {
                sendRequestSet(this.addLesson);
              }
            }}/>
          </View>
          <View style={styles.button}>
            <Button title="Zmień kursanta" onPress={() => { this.setState({locked: false, query: ''}); }}/>
          </View>
        </View>}
      </View>
    );
  }

}

export default AddEvent;