import { AuthorizationService } from './../authorization.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators} from '@angular/forms';

import { IReceivedMessageInterface } from '../interface/receivedMessageInterface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  to: any;
  textMessage: any;
  dataInstruktor: Observable<Array<instruktorListInterface>>;
  idKursant: any;
  idInstruktor: any;
  idSend: any;
  msgForm: FormGroup;
  message = {
    to: '',
    title: '',
    textMessage:''
  };
  rev$: Observable<Array<IReceivedMessageInterface>>;

  constructor(private Auth: AuthorizationService) {
    this.createForm();
  }


  createForm(): void {
   this.msgForm = new FormGroup({
       'to': new FormControl(this.message.to, [
             Validators.required,
             Validators.email
       ]),
       'title': new FormControl(this.message.title, [
           Validators.required,
           Validators.minLength(5)
       ]),
       'textMessage': new FormControl(this.message.textMessage, [
        Validators.required,
        Validators.minLength(10)
       ])
   });
  }

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    this.rev$ = this.Auth.getAllMessages(localStorage.getItem('userToken'));
  }

  sendMessage() {
    this.Auth.getUsersToMessage(localStorage.getItem('userToken')).subscribe(data => {
      data.forEach(element => {
        if (this.to === element.email) {
          this.Auth.addMessage(localStorage.getItem('userToken'), element.id, this.textMessage).subscribe();
        }
      });
    });
  }
}
