import { Router } from '@angular/router';
import { AuthorizationService } from './../authorization.service';
import { Component} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);

  errorMessage = false;
  noContract = false;
  hide = true;
  myForm: FormGroup;
  email: any;
  password: any;
  token: string;

  constructor(private Auth: AuthorizationService, private router: Router, private fb: FormBuilder) {
  }

  getErrorMessageEmail() {
    return this.emailControl.hasError('required') ? 'Pole nie może być puste!' :
        this.emailControl.hasError('email') ? 'Nieprawidłowy e-mail' :
            '';
  }

  getErrorMessagePassword() {
    return this.passwordControl.hasError('required') ? 'Pole nie może być puste!' :
            '';
  }

  loginUser() {
    this.Auth.login(this.email, this.password).subscribe(data => {
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userId', data.userId);

      setTimeout(() => {
        this.Auth.getTypeOfUser(data.token).subscribe(dat =>  {
          switch (dat) {
            case 0:
              this.router.navigate(['oskMenu/calendar']);
              break;
            case 1:
              this.router.navigate(['instruktorMenu/calendar']);
              break;
            case 2:
              this.router.navigate(['kursantMenu/calendar']);
              break;
          }
        },
        (err: HttpErrorResponse) => {
          this.noContract = true;

          setTimeout(() => {
            this.noContract = false;
          }, 1500);

          });
      }, 10);
    },
    (err: HttpErrorResponse) => {
        this.errorMessage = true;

      setTimeout(() => {
        this.errorMessage = false;
      }, 1500);
    });
  }
}
