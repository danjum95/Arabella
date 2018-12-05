import React from 'react';
import { Agenda } from 'react-native-calendars';
import { Text, View, StyleSheet } from 'react-native';
import {LocaleConfig} from 'react-native-calendars';
import {Actions} from 'react-native-router-flux';
import {requestEvents} from "../utils/mock-api";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addEvent } from '../actions/calendarActions';

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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount() {
    this.props.addEvent(requestEvents('ABCD1234'));
    this.setState({items: this.props.calendarEvents.events});
  }

  renderModal() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
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
        //loadItemsForMonth={this.loadItems.bind(this)}
        onDayPress={(day)=>{
          if(JSON.stringify(day) === JSON.stringify(this.state.selectedDay)) {
            Actions.AddEvent({eventDay: day});
          }
          else
            this.setState({selectedDay: day})
        }}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#666'},
        //    '2017-05-09': {textColor: '#666'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
    );
  }

  /*
  loadItems(day) {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
  }
  */

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}>
        <Text style={styles.mainText}>{item.name}</Text>
        <Text style={styles.lightText}>
          Od: {item.from}
        </Text>
        <Text style={styles.lightText}>
          Do: {item.to}
        </Text>
        <Text style={styles.lightText}>
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

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  lightText: {
    fontSize: 12,
    color: 'darkgrey'
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 14
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

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);