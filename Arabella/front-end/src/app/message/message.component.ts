import { AuthorizationService } from './../authorization.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { IReceivedMessageInterface } from '../interface/receivedMessageInterface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  positive = false;
  to: any;
  textMessage: any;
  msgForm: FormGroup;
  rev$: Observable<Array<IReceivedMessageInterface>>;

  constructor(private Auth: AuthorizationService, private fb: FormBuilder) {
    this.msgForm = fb.group({
      'to': [null, Validators.required],
      'texMessage': [null, Validators.required]
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
      this.positive = true;
      data.forEach(element => {
        if (this.to === element.email) {
          this.Auth.addMessage(localStorage.getItem('userToken'), element.id, this.textMessage).subscribe();
        }
      });
    });

    setTimeout(() => {
      this.positive = false;
    }, 1500);
  }
}
