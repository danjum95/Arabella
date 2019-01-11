import axios from 'axios';
import {_env} from "../local/env";
import {SecureStore} from "expo";
import {ToastAndroid} from "react-native";
import { Actions } from "react-native-router-flux";

export function sendRequestSet(requestSetCallback) {
  SecureStore.getItemAsync('token').then((token) => {
    SecureStore.getItemAsync('refresh-token').then((refreshToken) => {
      axios.post(_env.API_URL + '/api/login/check', {}, {
        headers: { "Token": token, "Refresh-Token": refreshToken }
      })
        .then(function (response) {
          requestSetCallback(token);
        })
        .catch(function (error) {
          console.log('/api/login/check - error');
          console.log(error.response);
          axios.post(_env.API_URL + '/api/login/renew', {}, {
            headers: { "Token": token, "Refresh-Token": refreshToken }
          })
            .then(function (response) {
              SecureStore.setItemAsync('token', response.data.token).then(
                SecureStore.setItemAsync('refresh-token', response.data['refresh-token']).then(() => {
                  console.log('refresh tokens');
                    requestSetCallback(token);
                }
                )
              );
            })
            .catch(function (error) {
              console.log('/api/login/renew - error');
              console.log(error.response);
              userLogout();
            });
        });
    });
  });
}

async function userLogout() {
  try {
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('refresh-token');
    ToastAndroid.show('Token mismatch!', ToastAndroid.SHORT);
    Actions.Login();
  } catch (error) {
    console.log('SecureStore error: ' + error.message);
  }
}