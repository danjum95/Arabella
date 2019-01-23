import { StyleSheet } from "react-native"

export default StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#efefef',
    padding:10
  },
  button:{
    padding: 5,
    margin: 5
  },
  bottomButton:{
    padding: 5,
    margin: 5,
    justifyContent: 'flex-end'
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
  messageFlexBox: {
    flex: 1,
    borderWidth:2,
    borderColor:'#000',
    padding: 5,
    margin: 5
  },
  lightText: {
    fontSize: 18,
    color: '#55F',
    fontWeight: 'bold'
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  messageToText: {
    fontWeight: 'bold',
    fontSize: 18
  },
  input:{
    padding:10, margin: 10,
    borderWidth:1, borderColor:'#333'
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
  },
  containerEvent:{
    flex:1,
    backgroundColor:'#efefef',
    padding:10,
  },
  containerTopContent:{
    flex:1,
    backgroundColor:'#efefef',
    padding:10,
    marginTop: 20
  },
  autoFillInput:{
    flex:1,
    marginTop: 20
  },
  messageView:{
    flex:1,
    padding:10
  },
  timepickerFrom:{
    flex:1,
    marginTop: 80,
    justifyContent:'center'
  },
  timepickerTo:{
    flex:1,
    justifyContent:'center'
  },
  mapContainer:{
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
})