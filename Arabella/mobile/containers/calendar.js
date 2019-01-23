import React from 'react';
import actions from "../actions";
import { Agenda } from 'react-native-calendars';
import {Text, ToastAndroid, View, Button} from 'react-native';
import {LocaleConfig} from 'react-native-calendars';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../styles/styles'
import axios from "axios";
import {_env} from "../local/env";
import {SecureStore} from "expo";
import {extractTimeString, localeConfigPolish} from "../utils/calendar-utils";

class Calendar extends React.Component {

  constructor(props) {
    super(props);
    LocaleConfig.locales['pl'] = localeConfigPolish;
    this.state = {
      modalVisible: false,
      selectedDay: undefined
    };
  }

  componentDidMount() {
    LocaleConfig.defaultLocale = 'pl';
    ToastAndroid.show('Naciśnij podwójnie dowolny dzień aby dodać jazdy!', ToastAndroid.LONG);
    SecureStore.getItemAsync('token').then((token) => {
      axios.get(_env.API_URL + '/api/lessons/of/school/' + this.props.schoolID, {
        headers: { Token: token }
      })
        .then(function (response) {
          response.data.forEach(obj => {
            this.props.addEvent(obj);
            this.forceUpdate();
          })
        }.bind(this))
        .catch(function (error) {
          ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
        });
    });
  }

  loadItems(day) {
    this.props.addKeyWithoutValue(day.dateString);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: 135}]}>
        <Text style={styles.mainTextDate}>Jazdy</Text>
        <Text style={styles.lightTextDate}>
          Od: {extractTimeString(item.date)}
        </Text>
        <Text style={styles.lightTextDate}>
          Do: {extractTimeString(item.endDate)}
        </Text>
        <Text style={styles.lightTextDate}>
          Kursant: {item.student.name}
        </Text>
        {this.renderItemMapButton(item.done, item.id, item.date)}
      </View>
    );
  }

  renderItemMapButton(done, id, date) {
    if(!done)
      return (
        <View style={styles.bottomButton}>
          <Button title='DODAJ TRASE' onPress={() => { Actions.Map({lessonId: id, lessonDate: date})} }/>
        </View>
      );
    else
      return (
        <View style={styles.bottomButton}>
          <Button title='POKAŻ TRASE' onPress={() => { Actions.MapReadOnly({lessonId: id})} }/>
        </View>
      );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}/>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  render() {
    return (
      <Agenda
        items={this.props.eventsStore}
        selected={new Date()}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        onDayPress={(day)=>{
          if(JSON.stringify(day) === JSON.stringify(this.state.selectedDay)) {
            this.setState({selectedDay: undefined});
            Actions.AddEvent({eventDay: day, schoolID: this.props.schoolID});
          }
          else
            this.setState({selectedDay: day})
        }}
        loadItemsForMonth={this.loadItems.bind(this)}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    eventsStore: state.calendar
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addEvent: actions.addEvent,
    addKeyWithoutValue: actions.addKeyWithoutValue
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);