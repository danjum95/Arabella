import React from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {requestParticipants} from "../utils/mock-api";

class ParticipantsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      participants: []
    }
  }

  componentDidMount() {
    this.setState({participants: requestParticipants('abcd1234')})
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.participants}
          renderItem={({item}) =>
            <View style={styles.element}>
              <Text style={styles.mainText}>{item.fullname}</Text>
              <Text style={styles.lightText}>{item.mail}</Text>
            </View>
          }
        />
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
  lightText: {
    fontSize: 18,
    color: 'darkgrey',
    fontWeight: 'bold'
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  element: {
    borderWidth:1,
    borderColor:'#ccc',
    padding: 2,
    margin: 2
  }
});

export default ParticipantsList;