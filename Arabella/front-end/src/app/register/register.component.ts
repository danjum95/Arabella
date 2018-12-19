import { AuthorizationService } from './../authorization.service';
import { Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: any;
  lastname: any;
  email: any;
  password: any;

  constructor(private router: Router, private Auth: AuthorizationService) { }

  register() {

    this.Auth.addUsers(this.name, this.lastname, this.email, this.password).subscribe(data => {
      localStorage.setItem('newUser', data.value);
    });

    this.router.navigate(['oskList']);
  }
}
