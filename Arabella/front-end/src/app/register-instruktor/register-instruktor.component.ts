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

  constructor(private Auth: AuthorizationService) {}

  register() {

    this.Auth.addUsers(this.name, this.lastname, this.email, this.password).subscribe(data => {
      this.token = data.value;
    });

    setTimeout(() => {
      this.Auth.cotractInstruktor(this.token, localStorage.getItem('userId'));
    }, 500);
  }

}