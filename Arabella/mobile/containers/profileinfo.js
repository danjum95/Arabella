import React from 'react';
import { View, Modal, Text, Button, TextInput, ToastAndroid} from 'react-native';
import styles from '../styles/styles'
import {bindActionCreators} from "redux";
import {addUserInfo, addUserRole} from "../actions/userInfoActions";
import { connect } from 'react-redux';
import axios from "axios";
import {_env} from "../local/env";
import {SecureStore} from "expo";

class ProfileInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,

      password: '',
      repeatPassword: ''
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  roleInterpreter(role) {
    if(role === 1)
      return 'Instruktor';
    if(role === 2)
      return 'Kursant';
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
                  SecureStore.getItemAsync('token').then((token) => {
                    axios.post(_env.API_URL + '/api/users/change/password', {
                      password: this.state.password
                    }, {
                      headers: { Token: token, 'Content-Type': 'application/json' }
                    })
                      .then(function (response) {
                        ToastAndroid.show('Zmieniono hasło!', ToastAndroid.SHORT);
                        this.setModalVisible(false);
                      }.bind(this))
                      .catch(function (error) {
                        console.log(error.response);
                        ToastAndroid.show('Błąd po stronie serwera!', ToastAndroid.SHORT);
                      });
                  });
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
            <Text style={styles.mainText}>{this.props.user.get('info').email}</Text>
          </View>

          <View style={styles.subElement}>
            <Text style={styles.lightText}>Imię</Text>
            <Text style={styles.mainText}>{this.props.user.get('info').firstName}</Text>
          </View>

          <View style={styles.subElement}>
            <Text style={styles.lightText}>Nazwisko</Text>
            <Text style={styles.mainText}>{this.props.user.get('info').lastName}</Text>
          </View>

          <View style={styles.subElement}>
            <Text style={styles.lightText}>Rola</Text>
            <Text style={styles.mainText}>{this.roleInterpreter(this.props.user.get('role'))}</Text>
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


const mapStateToProps = (state) => {
  const { user } = state;
  return { user }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addUserInfo,
    addUserRole
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo);