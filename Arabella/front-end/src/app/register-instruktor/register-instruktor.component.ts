import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';

@Component({
  selector: 'app-register-instruktor',
  templateUrl: './register-instruktor.component.html',
  styleUrls: ['./register-instruktor.component.css']
})
export class RegisterInstruktorComponent {
  name: any;
  lastname: any;
  email: any;
  password: any;
  token: any;

  isRegistered = false;

  constructor(private Auth: AuthorizationService) {}

  register() {

    this.Auth.addUsers(this.name, this.lastname, this.email, this.password).subscribe(data => {
      this.token = data.value
      this.Auth.getSchool(localStorage.getItem('userToken')).subscribe(data => {
        this.Auth.cotractInstruktor(this.token, data.id).subscribe();
        this.isRegistered = true;
      })
    });
  }

}
