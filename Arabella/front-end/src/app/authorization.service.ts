import { oskListInterface } from './interface/oskListInterface';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { instruktorListInterface } from './interface/instruktorListInterface';
import { receivedMessageInterface } from './interface/receivedMessageInterface';

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

  cotractKursant(token, id): any {
    return this.http.put(this.url + '/student/of/school/' + id, {headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }

  cotractInstruktor(token, id): any {
    return this.http.put(this.url + '/instructor/of/school/' + id, {headers: {'Content-Type' : 'application/json', 'Token' : token}});
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
    return this.http.post(this.url + '/users/change/password', data, {headers: {'Content-Type' : 'application/json', 'Token' : token}});
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









  registerInstuktor(token, email, name, surname, password) {
    const data = { token: token, email: email, name: name, surname: surname, password: password};
    return this.http.post(this.url + '/api/school/register/instructor', data , {headers: this.reqHeader});
  }

  getInstruktorList(token): Observable<Array<instruktorListInterface>> {
    const data = { token: token};
    return this.http.post<Array<instruktorListInterface>>(this.url + '/api/school/instructors', data , {headers: this.reqHeader});
  }

  getKursantList(token): Observable<Array<instruktorListInterface>> {
    const data = { token: token};
    return this.http.post<Array<instruktorListInterface>>(this.url + '/api/school/students', data , {headers: this.reqHeader});
  }

  getSchoolList(): Observable<Array<oskListInterface>> {
    return this.http.get<Array<oskListInterface>>(this.url + '/api/school/list');
  }

  registerSchool(name, email, password) {
    const data = { name: name, email: email, password: password};
    return this.http.post(this.url + '/api/school/register', data , {headers: this.reqHeader});
  }

  receivedMessage(token): Observable<Array<receivedMessageInterface>> {
    const data = { token: token };
    return this.http.post<Array<receivedMessageInterface>>(this.url + '/api/received/messages', data, {headers: this.reqHeader});
  }

  sendMessage(token, told, text) {
    const data = { token: token, told: told, text: text};
    return this.http.post(this.url + '/api/send/message', data, {headers: this.reqHeader});
  }

  sentMessage(token) {
    const data = { token: token};
    return this.http.post(this.url + '/api/sent/messages', data, {headers: this.reqHeader});
  }

  getInstList(token): any {
    const data = { token: token};
    return this.http.post(this.url + '/api/school/instructors', data , {headers: this.reqHeader});
  }

  addLesson(token, email, date, length) {
    const data = JSON.stringify({token: token, email: email, date: date, length: length});
    return this.http.post(this.url + '/api/add/lesson', data, {headers: this.reqHeader});
  }

  getKursantLessons(token) {
    const data = JSON.stringify({token: token});
    return this.http.post(this.url + '/api/get/lessons', data , {headers: this.reqHeader});
  }

  getInstruktorLessons(token) {
    const data = JSON.stringify({token: token});
    return this.http.post(this.url + '/api/instructor/get/lessons', data, {headers: this.reqHeader});
  }
  getSchoolLessons(token) {
    const data = JSON.stringify({token: token});
    return this.http.post(this.url + '/api/school/get/lessons', data, {headers: this.reqHeader});
  }
}

