import { Router } from '@angular/router';
import { AuthorizationService } from './../authorization.service';
import { Component} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  myForm: FormGroup;

  token: string;
  isLoginError = false;
 

  constructor(private Auth: AuthorizationService, private router: Router, private fb: FormBuilder) {
    this.myForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('.+[@].+[\.].+')])],
      'password': [null, Validators.required]
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
        });
      }, 500);
    },
    (err: HttpErrorResponse) => {
        this.isLoginError = true;
    });
  }
}
