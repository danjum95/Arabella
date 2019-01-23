import { AuthorizationService } from './../authorization.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);
  passwordControl2 = new FormControl('', [Validators.required]);

  successMessage = false;
  errorPassword = false;
  hide = true;

  name: any;
  surname: any;
  email: any;
  password: any;
  password2: any;

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

  getErrorMessageEmail() {
    return this.emailControl.hasError('required') ? 'Pole nie może być puste!' :
        this.emailControl.hasError('email') ? 'Nieprawidłowy e-mail' :
            '';
  }

  getErrorMessagePassword() {
    return this.passwordControl.hasError('required') ? 'Pole nie może być puste!' :
            '';
  }

  getErrorMessagePassword2() {
    return this.passwordControl2.hasError('required') ? 'Pole nie może być puste!' :
            '';
  }

  change() {
    this.Auth.getUserDetails(localStorage.getItem('userId')).subscribe(data => {

      if (data.email !== this.email) {
          this.successMessage = true;
          this.Auth.changeMail(this.email, localStorage.getItem('userToken')).subscribe();
      }

      setTimeout(() => {
        this.successMessage = false;
      }, 1500);
    });

    setTimeout(() => {
      this.Auth.login(this.email, this.password2).subscribe(data => {
        if (!this.passwordControl.invalid && (this.password !== this.password2)) {

          if (!this.successMessage) {
            this.successMessage = true;
          }
          this.Auth.changePassword(this.password, localStorage.getItem('userToken')).subscribe();
        }
      },
      (err: HttpErrorResponse) => {
        this.errorPassword = true;

        setTimeout(() => {
          this.errorPassword = false;
        }, 1500);
      });

      setTimeout(() => {
        this.successMessage = false;
      }, 1500);
    }, 100);
  }
}
