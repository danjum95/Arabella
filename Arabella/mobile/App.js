import React from 'react';
import Login from "./containers/login";
import Usermenu from "./containers/usermenu";
import Calendar from "./containers/calendar";
import AddEvent from "./containers/addEvent";
import Map from "./containers/map";
import ParticipantsList from "./containers/participantsList";
import {ActionConst, Router, Scene} from 'react-native-router-flux';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import { SecureStore } from "expo";
import { createStore } from "redux";
import reducer from "./reducers/reducer";
import { Provider } from 'react-redux';
import ProfileInfo from "./containers/profileinfo";
import MapReadOnly from "./containers/mapReadOnly";
import CalendarReadOnly from "./containers/calendarReadOnly";
import Messages from "./containers/messages";
import Inbox from "./containers/inbox";
import SendMessage from "./containers/sendMessage";

const store = createStore(reducer);

class App extends React.Component {

  constructor() {
    super();
    this.state = { hasToken: false, isLoaded: false };
  }

  componentDidMount() {
    SecureStore.getItemAsync('token').then((token) => {
      this.setState({ hasToken: token !== null, isLoaded: true })
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <Provider store={ store }>
          <Router>
            <Scene key='root'>
              <Scene
                component={Login}
                hideNavBar={true}
                initial={!this.state.hasToken}
                key='Login'
                title='Login'
              />
              <Scene
                component={Usermenu}
                hideNavBar={true}
                initial={this.state.hasToken}
                key='Usermenu'
                title='Usermenu'
                type={ActionConst.RESET}
              />
              <Scene
                component={Calendar}
                hideNavBar={true}
                key='Calendar'
                title='Calendar'
              />
              <Scene
                component={CalendarReadOnly}
                hideNavBar={true}
                key='CalendarReadOnly'
                title='CalendarReadOnly'
              />
              <Scene
                component={AddEvent}
                hideNavBar={true}
                key='AddEvent'
                title='AddEvent'
              />
              <Scene
                component={ParticipantsList}
                hideNavBar={true}
                key='ParticipantsList'
                title='ParticipantsList'
              />
              <Scene
                component={ProfileInfo}
                hideNavBar={true}
                key='ProfileInfo'
                title='ProfileInfo'
              />
              <Scene
                component={Map}
                hideNavBar={true}
                key='Map'
                title='Map'
              />
              <Scene
                component={MapReadOnly}
                hideNavBar={true}
                key='MapReadOnly'
                title='MapReadOnly'
              />
              <Scene
                component={Messages}
                hideNavBar={true}
                key='Messages'
                title='Messages'
              />
              <Scene
                component={Inbox}
                hideNavBar={true}
                key='Inbox'
                title='Inbox'
              />
              <Scene
                component={SendMessage}
                hideNavBar={true}
                key='SendMessage'
                title='SendMessage'
              />
            </Scene>
          </Router>
        </Provider>
      );
    }
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    backgroundColor:'#efefef',
    padding:10
  }
});

export default App;
