import { AuthorizationService } from './../authorization.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  successMessage = false;
  name: any;
  surname: any;
  email: any;
  password: any;

  constructor(private Auth: AuthorizationService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.Auth.getUserDetails(localStorage.getItem('userId')).subscribe(data => {
      this.email = data.email;
      this.name = data.firstName;
      this.surname = data.lastName;
    });
  }

  change() {
    this.Auth.getUserDetails(localStorage.getItem('userId')).subscribe(data => {
      
      if (data.email !== this.email) {
          this.successMessage = true;
          this.Auth.changeMail(this.email, localStorage.getItem('userToken')).subscribe();
      }
    });

    setTimeout(() => {
      this.successMessage = false;
    }, 1000);

    this.changePassword();
  }

  changePassword() {

    if (this.password !== undefined) {
      if(!this.successMessage) {
        this.successMessage = true;
      }
      this.Auth.changePassword(this.password, localStorage.getItem('userToken')).subscribe();
    }

    setTimeout(() => {
      this.successMessage = false;
    }, 1000);
  }

}
