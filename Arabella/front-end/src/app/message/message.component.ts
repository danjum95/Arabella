import { AuthorizationService } from './../authorization.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IReceivedMessageInterface } from '../interface/receivedMessageInterface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  to: any;
  textMessage: any;
  rev$: Observable<Array<IReceivedMessageInterface>>;

  constructor(private Auth: AuthorizationService) {
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
