import { instruktorListInterface } from './../interface/instruktorListInterface';
import { AuthorizationService } from './../authorization.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { receivedMessageInterface } from '../interface/receivedMessageInterface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  receivedMessages$: Observable<Array<receivedMessageInterface>>;
  to: any;
  title: any;
  textMessage: any;
  dataInstruktor: Observable<Array<instruktorListInterface>>;
  idKursant: any;
  idInstruktor: any;
  idSend: any;

  constructor(private Auth: AuthorizationService) {
   }

  ngOnInit() {
    this.receivedMessage();
  }

  receivedMessage() {
    this.receivedMessages$ = this.Auth.receivedMessage(localStorage.getItem('userToken'));
  }

  sendMessage(event) {
    event.preventDefault();
    const target = event.target;
    this.to = target.querySelector('#to').value;
    this.title = target.querySelector('#title').value;
    this.textMessage = target.querySelector('#textMessage').value;

    /*this.Auth.getInstruktorList(localStorage.getItem('userToken')).subscribe(data => {
        data.forEach(element => {
          if (element.email === this.to) {
            this.idInstruktor = element.id;
            this.idKursant = null;
          }
        });
      });

      this.Auth.getKursantList(localStorage.getItem('userToken')).subscribe(data => {
        data.forEach(element => {
          if (element.email === this.to) {
            this.idKursant = element.id;
            this.idInstruktor = null;
          }
        });
      });
      if (this.idInstruktor === null) {
        this.idSend = this.idKursant;
      } else {
        this.idSend = this.idInstruktor;
      }
      this.Auth.sendMessage(localStorage.getItem('userToken'), this.idSend, this.textMessage);*/
  }
}
