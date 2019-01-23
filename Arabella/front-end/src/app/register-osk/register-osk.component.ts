import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-osk',
  templateUrl: './register-osk.component.html',
  styleUrls: ['./register-osk.component.css']
})
export class RegisterOskComponent {

  oskNameControl = new FormControl('', [Validators.required]);
  nameControl = new FormControl('', [Validators.required]);
  lastnameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);
  passwordControl2 = new FormControl('', [Validators.required]);

  errorMessage = false;
  errorDataMessage = false;
  successMessage = false;
  isWrongPasswords = false;

  name: any;
  lastname: any;
  email: any;
  password: any;
  password2: any;
  hide = true;

  token: any;
  oskName: any;

  constructor(private Auth: AuthorizationService, private router: Router, private fb: FormBuilder) {
   }

   getErrorMessageOskName() {
    return this.passwordControl.hasError('required') ? 'Pole nie może być puste!' :
            '';
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
      if (this.password !== this.password2) {
        this.isWrongPasswords = true;
      } else if (this.oskNameControl.invalid || this.emailControl.invalid || this.nameControl.invalid
        || this.lastnameControl.invalid || this.passwordControl.invalid || this.passwordControl2.invalid) {
          this.errorMessage = true;
      } else {
      this.Auth.addUsers(this.name, this.lastname, this.email, this.password).subscribe(data => {
        this.successMessage = true;
        localStorage.setItem('newTokenOsk', data.value);
        localStorage.setItem('oskName', this.oskName);
        this.router.navigate(['activeOsk']);
      },
      (err: HttpErrorResponse) => {
        this.errorDataMessage = true;
      });
    }

    setTimeout(() => {
      this.isWrongPasswords = false;
      this.errorMessage = false;
      this.errorDataMessage = false;
    }, 2000);
  }
}
