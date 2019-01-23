export function addEvent( event ) {
  return {
    type: "ADD_EVENT",
    payload: event
  }
}

export function addKeyWithoutValue( dateString ) {
  return {
    type: "ADD_KEY_WITHOUT_VALUE",
    payload: dateString
  }
}

export function changeMapState( dateIdObject ) {
  return {
    type: "CHANGE_MAP_STATE",
    payload: dateIdObject
  }
}