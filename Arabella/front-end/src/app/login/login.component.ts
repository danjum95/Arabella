import { Router } from '@angular/router';
import { AuthorizationService } from './../authorization.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  token: string;
  isLoginError = false;
  loginForm: FormGroup;
  login = {
    username: '',
    password: ''
  };
  constructor(private Auth: AuthorizationService, private router: Router) {
      this.createForm();
   }


   createForm(): void {
    this.loginForm = new FormGroup({
        'username': new FormControl(this.login.username, [
              Validators.required,
              Validators.email
        ]),
        'password': new FormControl(this.login.password, [
            Validators.required,
            Validators.minLength(6)
        ])
    });
}

  loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const email = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;

    this.Auth.login(email, password).subscribe(data => {
      localStorage.setItem('userToken', data.value);
      localStorage.setItem('userId', data.userId);

      setTimeout(() => {
        this.Auth.getTypeOfUser(data.value).subscribe(dat =>  {
          switch (dat) {
            case 0:
              this.router.navigate(['oskMenu']);
              break;
            case 1:
              this.router.navigate(['instruktorMenu']);
              break;
            case 2:
              this.router.navigate(['kursantMenu']);
              break;
          }
        },
        (err: HttpErrorResponse) => {
          this.router.navigate(['oskList']);
        });
      }, 500);
    },
    (err: HttpErrorResponse) => {
        this.isLoginError = true;
    });
  }
}
