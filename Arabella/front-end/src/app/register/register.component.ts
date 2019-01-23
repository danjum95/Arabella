import { AuthorizationService } from './../authorization.service';
import { Router} from '@angular/router';
import { Component} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  nameControl = new FormControl('', [Validators.required]);
  lastnameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);
  passwordControl2 = new FormControl('', [Validators.required]);

  errorMessage = false;
  errorMessageData = false;
  errorData = false;

  hide = true;
  name: any;
  lastname: any;
  email: any;
  password: any;
  password2: any;

  isLoginError = false;

  constructor(private router: Router, private Auth: AuthorizationService, private fb: FormBuilder) {
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

  registerUser() {
    if (!(this.password === this.password2)) {
      this.errorMessage = true;
    } else if (this.nameControl.invalid || this.lastnameControl.invalid || this.emailControl.invalid
      || this.passwordControl.invalid || this.passwordControl2.invalid) {
        this.errorData = true;
      } else {
      this.Auth.addUsers(this.name, this.lastname, this.email, this.password).subscribe(data => {
        localStorage.setItem('newUser', data.value);
        setTimeout(() => {
          this.router.navigate(['sendEmail']);
        }, 300);
      },
      (err: HttpErrorResponse) => {
        this.errorMessageData = true;
      });
    }

    setTimeout(() => {
      this.errorData = false;
      this.errorMessage = false;
      this.errorMessageData = false;
    }, 1500);
  }
}
