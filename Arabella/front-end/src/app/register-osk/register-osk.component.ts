import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';

@Component({
  selector: 'app-register-osk',
  templateUrl: './register-osk.component.html',
  styleUrls: ['./register-osk.component.css']
})
export class RegisterOskComponent {
  name: any;
  lastname: any;
  email: any;
  password: any;
  token: any;
  oskName: any;

  constructor(private Auth: AuthorizationService, private router: Router) { }

  register() {

    this.Auth.addUsers(this.name, this.lastname, this.email, this.password).subscribe(data => {
      localStorage.setItem('newTokenOsk', data.value);
    });

    setTimeout(() => {
      this.Auth.addSchools(this.oskName, localStorage.getItem('newTokenOsk'));
      setTimeout(() => {
        localStorage.removeItem('newTokenOsk');
        this.router.navigate(['']);
      }, 300);
    }, 300);
  }

}
