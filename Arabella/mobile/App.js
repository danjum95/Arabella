import React from 'react';
import Login from "./containers/login";
import Usermenu from "./containers/usermenu";
import Calendar from "./containers/calendar";
import AddEvent from "./containers/addEvent";
import ParticipantsList from "./containers/participantsList";
import {ActionConst, Router, Scene} from 'react-native-router-flux';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import { SecureStore } from "expo";
import { createStore } from "redux";
import reducer from "./reducers/reducer";
import { Provider } from 'react-redux';
import ProfileInfo from "./containers/profileinfo";

const store = createStore(reducer);

export default class App extends React.Component {

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
