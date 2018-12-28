import { oskListInterface } from './interface/oskListInterface';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { contractListInterface } from './interface/contractListInterface';
import { IReceivedMessageInterface } from './interface/receivedMessageInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  readonly url = 'http://orlean.ski:7090/api';
  reqHeader = new HttpHeaders({'Content-Type' : 'application/json'});
  constructor(private http: HttpClient) { }

  login(email, password): any {
    const data = { email: email, password: password };
    return this.http.post(this.url + '/login', data , {headers: this.reqHeader});
  }

  getTypeOfUser(token): any {
    return this.http.get(this.url + '/users/which/type/of/user', {headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }

  addUsers(firstName, lastName, email, password): any {
    const data = {firstName: firstName, lastName: lastName, email: email, password: password};
    return this.http.put(this.url + '/users', data, {headers: this.reqHeader});
  }

  getSchools(): Observable<Array<oskListInterface>> {
    return this.http.get<Array<oskListInterface>>(this.url + '/schools', {headers: this.reqHeader});
  }

  getAllContracts(token): Observable<Array<contractListInterface>> {
    return this.http.get<Array<contractListInterface>>(this.url + '/contract/', {
      headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }

  cotractKursant(token, id): any {
    return this.http.put(this.url + '/contract/student/of/school/' + id, null, {
      headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }

  cotractInstruktor(token, id): any {
    return this.http.put(this.url + '/contract/instructor/of/school/' + id, null, {
      headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }

  addSchools(name, token): any {
    const data = {name: name};
    return this.http.put(this.url + '/schools', data, {headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }

  changePassword(password, token): any {
    const data = {password: password};
    return this.http.post(this.url + '/users/change/password', data, {headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }

  changeMail(email, token): any {
    const data = {email: email};
    return this.http.post(this.url + '/users/change/email', data, {headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }

  getUserInfo(token): any {
    return this.http.get(this.url + '/users/user/info', {headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }

  getUserDetails(userId): any {
    return this.http.get(this.url + '/users/' + userId, {headers: this.reqHeader});
  }

  getSchool(token): any {
    return this.http.get(this.url + '/users/which/school', {headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }

  getInstructors(token, id): any {
    return this.http.get(this.url + '/instructors/of/school/' + id, {headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }

  getStudents(token, id): any {
    return this.http.get(this.url + '/students/of/school/' + id, {headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }
  getLesson(token, id) {
    return this.http.get(this.url + '/lessons/of/school/' + id, {headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }

  getUsersToMessage(token): any {
    return this.http.get(this.url + '/messages/users', {headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }

  addMessage(token, receiverId, message): any {
    const data = {receiverId: receiverId, message: message};
    return this.http.put(this.url + '/messages', data, {headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }

  getAllMessages(token): Observable<Array<IReceivedMessageInterface>> {
    return this.http.get<Array<IReceivedMessageInterface>>(this.url + '/messages',
    {headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }

  addLessons(token, studentId, endDate, date): any {
    const data = {studentId: studentId, date: date, endDate: endDate};
    return this.http.put(this.url + '/lessons', data, {headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }

  getLessons(token, schoolId): any {
    return this.http.get(this.url + '/lessons/of/school/' + schoolId, {headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }

  getMap(lessonId): any
  {
    return this.http.get(this.url + '/maps/' + lessonId, {headers: {'Content-Type' : 'application/json'}});
  }

  generalInfo(token, email): any {
    const data = {email: email};
    return this.http.post(this.url + '/users/other/user/info', data, {headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }

  acceptContract(token, contractId, status) {
    const data = {status: status};
    return this.http.put(this.url + '/contract/change/status/of/' + contractId, data, {
      headers: {'Content-Type' : 'application/json', 'Token' : token}});

  }
}

