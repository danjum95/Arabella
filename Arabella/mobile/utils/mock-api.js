const credentials = {
  username: "test@test.pl",
  password: "qwer"
};

const profileInfo = {
  mail: "test@test.pl",
  name: "Jan",
  surname: "Kowalski",
  role: "Instruktor"
};

const events = {
  '2018-12-05': [{name: 'Testowe Jazdy 1', height: 100, from: '10:00',to: '12:00', participant: 'Jakub Piechowiak'}],
  '2018-12-02': [{name: 'Testowe Jazdy 2', height: 100, from: '12:30',to: '16:00', participant: 'Jan Kowalski'}],
  '2018-12-10': [{name: 'Testowe Jazdy 3', height: 100, from: '9:00',to: '11:30', participant: 'Adam Nowak'},
    {name: 'Testowe Jazdy 4', height: 100, from: '12:00',to: '14:00', participant: 'Ola Strelczuk'}]
};

const participants = [
  {key: '0', fullname: 'Jakub Piechowiak', mail: 'asdf@test.pl'},
  {key: '1', fullname: 'Jan Kowalski', mail: 'zxcv@test.pl'},
  {key: '2', fullname: 'Adam Nowak', mail: 'qwer@test.pl'},
  {key: '3', fullname: 'Ola Strelczuk', mail: 'qaz@test.pl'},
  {key: '4', fullname: 'Amadeusz Kryze', mail: 'wsx@test.pl'}
];

export function requestLogIn(username, password) {
  if(username === credentials.username && password === credentials.password)
    return 'TOKENqwerty123456';
  else
    return null;
}

export function requestEvents(token) {
  if(!token)
    return null;
  else
    return events;
}

export function requestParticipants(token) {
  if(!token)
    return null;
  else
    return participants;
}

export function requestProfileData(token) {
  if(!token)
    return null;
  else
    return profileInfo;
}