import { oskListInterface } from './interface/oskListInterface';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { instruktorListInterface } from './interface/instruktorListInterface';
import { receivedMessageInterface } from './interface/receivedMessageInterface';
import { contractListInterface } from './interface/contractListInterface';

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

  getAllContracts(token) : Observable<Array<contractListInterface>> {
    return this.http.get<Array<contractListInterface>>(this.url + '/contract/', {headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }

  cotractKursant(token, id): any {
    return this.http.put(this.url + '/contract/student/of/school/' + id, null, {headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }

  cotractInstruktor(token, id): any {
    return this.http.put(this.url + '/contract/instructor/of/school/' + id, null, {headers: {'Content-Type' : 'application/json', 'Token' : token}});
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

  addNewLesson(token, email, date, length) {
    const data = {
    instructorId:localStorage.getItem('userId'),
    schoolId:"this.Auth.getSchool(localStorage.getItem('userToken')).subscribe(data => {",
    studentId:email,
    date: date,
    endDate: length};
    return this.http.put(this.url + '/lessons', data, {headers: {'Content-Type' : 'application/json', 'Token' : token}});
  }

  getMap(lessonId)
  {
    return this.http.put(this.url + '/maps' + lessonId , {headers: {'Content-Type' : 'application/json'}});
  }

  getLessonMap()
  {
    return this.http.put(this.url + '/maps', {headers: {'Content-Type' : 'application/json'}});
  }
  registerInstuktor(token, email, name, surname, password) {
    const data = { token: token, email: email, name: name, surname: surname, password: password};
    return this.http.post(this.url + '/api/school/register/instructor', data , {headers: this.reqHeader});
  }

  getInstruktorList(token, id): Observable<Array<instruktorListInterface>> {
    return this.http.get<Array<instruktorListInterface>>(this.url + '/instructors/of/school/' + id, {headers: {'Token': token}});
  }

  getKursantList(token, id): Observable<Array<instruktorListInterface>> {
    return this.http.get<Array<instruktorListInterface>>(this.url + '/students/of/school/' + id, {headers: {'Token': token}});
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
    return this.http.get<Array<receivedMessageInterface>>(this.url + '/messages/', {headers: {"Token": token}});
  }

  sendMessage(token, told, text) {
    const data = { receiverId: told, message: text};
    return this.http.put(this.url + '/messages', data, {headers: {"Token": token}});
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

