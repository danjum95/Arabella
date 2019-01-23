import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-instruktor',
  templateUrl: './register-instruktor.component.html',
  styleUrls: ['./register-instruktor.component.css']
})
export class RegisterInstruktorComponent {
  nameControl = new FormControl('', [Validators.required]);
  lastnameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);
  passwordControl2 = new FormControl('', [Validators.required]);

  hide = true;
  errorMessage = false;
  errorMessageData = false;
  successMessage = false;
  isWrongPasswords = false;

  name: any;
  lastname: any;
  email: any;
  password: any;
  password2: any;
  token: any;

  constructor(private Auth: AuthorizationService, private fb: FormBuilder) {
  }

  getErrorMessageName() {
    return this.passwordControl.hasError('required') ? 'Pole nie może być puste!' :
            '';
  }

  getErrorMessageLastname() {
    return this.passwordControl.hasError('required') ? 'Pole nie może być puste!' :
            '';
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

  register() {
    if (!(this.password === this.password2)) {
      this.isWrongPasswords = true;
    } else if (this.nameControl.invalid || this.lastnameControl.invalid || this.emailControl.invalid
      || this.passwordControl.invalid || this.passwordControl2.invalid) {
        this.errorMessage = true;
      } else {
      this.Auth.addInstructors(this.name, this.lastname, this.email, this.password, localStorage.getItem('userToken')).subscribe(data => {
        this.successMessage = true;
        this.token = data.value;
        this.Auth.getSchool(localStorage.getItem('userToken')).subscribe(dat => {
          this.Auth.cotractInstruktor(this.token, dat.id).subscribe();
        });
      },
      (err: HttpErrorResponse) => {
        this.errorMessageData = true;
      });
    }

    setTimeout(() => {
      this.successMessage = false;
      this.errorMessage = false;
      this.errorMessageData = false;
      this.isWrongPasswords = false;
    }, 1500);
  }
}
