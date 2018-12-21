import React from 'react';
import MapView, { Polyline } from 'react-native-maps';
import {Platform, View, StyleSheet, Button, Alert, ToastAndroid} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import DialogInput from 'react-native-dialog-input';
import { Actions } from 'react-native-router-flux';
import axios from "axios";
import {_env} from "../local/env";

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: null,
      prevLocation: null,
      locationUpdates: false,

      lines: [],
      markers: [],

      isDialogVisible: false,
      markerTitle: ''
    }
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice)
      console.log('incomaptibile device');
    else
      this._getLocationAsync();
  }

  showDialog() {
    this.setState({isDialogVisible: true})
  }

  hideDialog() {
    this.setState({isDialogVisible: false, markerTitle: ''})
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted')
      console.log('permission denied');

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  _checkIn = async () => {
    if (this.state.locationUpdates) {
      Alert.alert("Trasa jest już śledzona!");
    } else {
      this.setState({ locationUpdates: true, });
      Alert.alert("Rozpoczęto śledzenie trasy!");
      Location.watchPositionAsync({
        enableHighAccuracy: true,
        distanceInterval: 10,
      }, NewLocation => {
        this.setState({
          prevLocation: this.state.location,
          location: NewLocation
        });
        this.setState(prevState => ({
          lines: [...prevState.lines, {latitude: NewLocation.coords.latitude, longitude: NewLocation.coords.longitude}]
        }))
      });
    }
  };

  _checkOut = async () => {
    if (!this.state.locationUpdates) {
      console.log("YOU ARE ALREADY CHECKED OUT!");
    } else {
      this.setState({ locationUpdates: false, });
      console.log("SUCCESSFULLY CHECKED OUT!");
    }
  };

  saveMap() {
    axios.put(_env.API_URL + '/api/maps/', {
      markers: this.state.markers,
      lines: this.state.lines
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
        ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
      });
  }

  addMarker(title) {
    this.setState(prevState => ({
      markers: [...prevState.markers, {
        key: this.state.markers.length,
        title: title,
        coordinates: {
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.longitude
        },
      }]
    }));
  }

  render() {
    if(this.state.location) {
      return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            region={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
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

          <View style={{ height: 120, justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 10}}>
            <View style={{ padding: 5 }}>
              <Button
                onPress={() => {
                  if(this.state.locationUpdates) {
                    this.showDialog();
                  }
                  else Alert.alert("Trasa nie jest śledzona!");
                }}
                title="+"
                color="#f47141"
              />
            </View>
            <View style={{ padding: 5 }}>
              <Button
                onPress={() => {this._checkIn()}}
                title="Start"
                color="#841584"
              />
            </View>
            <View style={{ padding: 5 }}>
              <Button
                onPress={() => {}}
                title="Zapisz"
                color="#841584"
              />
            </View>
          </View>

          <DialogInput isDialogVisible={this.state.isDialogVisible}
                       title={"Znacznik"}
                       message={"Dodaj punkt kontrolny"}
                       hintInput ={"Nazwa"}
                       submitInput={ (inputText) => {
                         this.addMarker(inputText);
                         this.hideDialog();
                       }}
                       closeDialog={ () => {this.hideDialog()}}>
          </DialogInput>

        </View>
      );
    }
    else return (<View/>);

  }

}

const styles = StyleSheet.create({
  container:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
  },
  map:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});

export default Map;