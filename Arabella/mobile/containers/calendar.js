import React from 'react';
import { Agenda } from 'react-native-calendars';
import {Text, ToastAndroid, View} from 'react-native';
import {LocaleConfig} from 'react-native-calendars';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addEvent } from '../actions/calendarActions';
import styles from '../styles/styles'
import axios from "axios";
import {_env} from "../local/env";
import {SecureStore} from "expo";

class Calendar extends React.Component {

  constructor(props) {
    super(props);
    LocaleConfig.locales['pl'] = {
      monthNames: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'],
      monthNamesShort: ['Sty','Lut','Mar','Kwi','Maj','Cze','Lip','Sie','Wrz','Paź','Lis','Gru'],
      dayNames: ['Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota','Niedziela'],
      dayNamesShort: ['Pn.','Wt.','Śr.','Czw.','Pt.','Sb.','Nd.']
    };
    this.state = {
      items: {},
      modalVisible: false,
      selectedDay: undefined
    };
  }

  componentWillMount() {
    SecureStore.getItemAsync('token').then((token) => {
      axios.get(_env.API_URL + '/api/lessons/of/school/' + this.props.schoolID, {
        headers: { Token: token }
      })
        .then(function (response) {
          response.data.forEach(obj => {
            const date = obj.date.split('T')[0];
            if(!(date in this.state.items)) {
              let newItems = this.state.items;
              newItems[date] = [{
                name: 'Jazdy',
                height: 100,
                from: obj.date.split('T')[1],
                to: obj.endDate.split('T')[1],
                participant: obj.student.firstName + ' ' + obj.student.lastName
              }];
              this.setState({ items: newItems });
            }
            else {
              let newItems = this.state.items;
              newItems[date].push({
                name: 'Jazdy',
                height: 100,
                from: obj.date.split('T')[1],
                to: obj.endDate.split('T')[1],
                participant: obj.student.firstName + ' ' + obj.student.lastName
              });
              this.setState({ items: newItems });
            }

          })
        }.bind(this))
        .catch(function (error) {
          console.log(error);
          ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
        });
    });
  }

  loadItems(day) {
    if(!(day.dateString in this.state.items)) {
      let newItems = this.state.items;
      newItems[day.dateString] = [];
      this.setState({ items: newItems });
    }
  }

  render() {
    LocaleConfig.defaultLocale = 'pl';
    return (
      <Agenda
        items={this.state.items}
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

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}>
        <Text style={styles.mainTextDate}>{item.name}</Text>
        <Text style={styles.lightTextDate}>
          Od: {item.from.split(':')[0] + ':' + item.from.split(':')[1]}
        </Text>
        <Text style={styles.lightTextDate}>
          Do: {item.to.split(':')[0] + ':' + item.to.split(':')[1]}
        </Text>
        <Text style={styles.lightTextDate}>
          Kursant: {item.participant}
        </Text>
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

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

}

const mapStateToProps = (state) => {
  const { calendarEvents } = state;
  return { calendarEvents }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addEvent,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);