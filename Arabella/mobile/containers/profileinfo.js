import React from 'react';
import {StyleSheet, View, Modal, TouchableHighlight, Text, Button, TextInput, ToastAndroid} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { requestProfileData } from "../utils/mock-api";

class ProfileInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profileData: {},
      modalVisible: false,

      password: '',
      repeatPassword: ''
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount() {
    this.setState({profileData: requestProfileData('abcd1234')})
  }

  renderModal() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          console.log('modal closed');
        }}>
        <View style={styles.container}>
          <TextInput
            placeholder='Nowe hasło'
            style={styles.input}
            onChangeText={(password) => this.setState({password})}
            secureTextEntry={true}
          />
          <TextInput
            placeholder='Powtórz hasło'
            style={styles.input}
            onChangeText={(repeatPassword) => this.setState({repeatPassword})}
            secureTextEntry={true}
          />
          <View style={styles.button}>
            <Button
              onPress={() => {
              if(!this.state.password)
                ToastAndroid.show('Wpisz hasło!', ToastAndroid.SHORT);
              else {
                if(this.state.password === this.state.repeatPassword) {
                  ToastAndroid.show('Zmieniono hasło!', ToastAndroid.SHORT);
                  this.setModalVisible(false);
                }
                else
                  ToastAndroid.show('Hasła różnią się od siebie!', ToastAndroid.SHORT);
              }
            }} title="Potwierdź" />
          </View>
          <View style={styles.button}>
            <Button
              onPress={() => {
                this.setModalVisible(false);
              }} title="Wróć" />
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.element}>
          <View style={styles.subElement}>
            <Text style={styles.lightText}>Mail</Text>
            <Text style={styles.mainText}>{this.state.profileData.mail}</Text>
          </View>

          <View style={styles.subElement}>
            <Text style={styles.lightText}>Imię</Text>
            <Text style={styles.mainText}>{this.state.profileData.name}</Text>
          </View>

          <View style={styles.subElement}>
            <Text style={styles.lightText}>Nazwisko</Text>
            <Text style={styles.mainText}>{this.state.profileData.surname}</Text>
          </View>

          <View style={styles.subElement}>
            <Text style={styles.lightText}>Rola</Text>
            <Text style={styles.mainText}>{this.state.profileData.role}</Text>
          </View>
        </View>

        <View style={styles.button}>
          <Button onPress={() => {
            this.setModalVisible(true);
          }} title="Zmień hasło" />
        </View>
        {this.renderModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    backgroundColor:'#efefef',
    padding:10
  },
  button:{
    padding: 5,
    margin: 5
  },
  element: {
    borderWidth:2,
    borderColor:'#000',
    padding: 5,
    margin: 5
  },
  subElement: {
    borderWidth:1,
    borderColor:'#ccc',
    padding: 2,
    margin: 2
  },
  lightText: {
    fontSize: 18,
    color: 'darkgrey',
    fontWeight: 'bold'
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  input:{
    padding:10, margin: 10,
    borderWidth:1, borderColor:'#ccc'
  }
});

export default ProfileInfo;