import React from 'react';
import MapView, { Polyline } from 'react-native-maps';
import {Platform, View, StyleSheet, Button, Alert, ToastAndroid} from 'react-native';
import {Constants, Location, Permissions, SecureStore} from 'expo';
import DialogInput from 'react-native-dialog-input';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/styles'
import axios from "axios";
import {_env} from "../local/env";

class MapReadOnly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,

      lines: [],
      markers: []
    }
  }

  componentDidMount() {
    const self = this;
    SecureStore.getItemAsync('token').then((token) => {
      axios.get(_env.API_URL + '/api/maps/' + this.props.lessonId, {
        headers: { Token: token }
      })
        .then(function (response) {
          self.setState({lines: response.data.mapLines, markers: response.data.mapMarkers}, () => {
            self.setState({location: self.state.lines[0]});
          })
        })
        .catch(function (error) {
          ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
          Actions.Usermenu();
        });
    });
  }

  render() {
    console.log(this.state.location);
    if(this.state.location) {
      return (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: this.state.location.latitude,
              longitude: this.state.location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            region={{
              latitude: this.state.location.latitude,
              longitude: this.state.location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Polyline coordinates={this.state.lines}/>
            {this.state.markers.map(marker => (
              <MapView.Marker
                key={marker.key}
                coordinate={marker.coordinates}
                title={marker.title}
              />
            ))}
          </MapView>
        </View>
      );
    }
    else return (<View/>);
  }
}

export default MapReadOnly;