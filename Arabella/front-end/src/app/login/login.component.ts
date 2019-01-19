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

  errorMessage = false;
  noContract = false;
  myForm: FormGroup;
  email: any;
  password: any;
  token: string;

  constructor(private Auth: AuthorizationService, private router: Router, private fb: FormBuilder) {
    this.myForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('.+[@].+[\.].+')])],
      'password': [null, Validators.required]
    });
  }

  loginUser() {
    if (this.myForm.invalid) {
      this.errorMessage = true;
    }

    setTimeout(() => {
      this.errorMessage = false;
    }, 1500);

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
          });
      }, 1000);
    },
    (err: HttpErrorResponse) => {
      if (!this.errorMessage) {
        this.errorMessage = true;
      }

      setTimeout(() => {
        this.errorMessage = false;
        this.noContract = false;
      }, 1500);
    });
  }
}
