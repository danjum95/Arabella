import { StyleSheet } from "react-native"

export default StyleSheet.create({
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
  },
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
  lightTextDate: {
    fontSize: 12,
    color: 'darkgrey'
  },
  mainTextDate: {
    fontWeight: 'bold',
    fontSize: 14
  }
})