import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-instruktor',
  templateUrl: './register-instruktor.component.html',
  styleUrls: ['./register-instruktor.component.css']
})
export class RegisterInstruktorComponent {
  errorMessage = false;
  errorMessageData = false;
  successMessage = false;
  name: any;
  lastname: any;
  email: any;
  password: any;
  token: any;
  myForm: FormGroup;

  constructor(private Auth: AuthorizationService, private fb: FormBuilder) {
    this.myForm = fb.group({
      'name': [null, Validators.required],
      'lastname': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.pattern('.+[@].+[\.].+')])],
      'password': [null, Validators.required]
    });
  }

  register() {
    if (this.myForm.invalid) {
      this.errorMessage = true;
    } else {
      this.Auth.addUsers(this.name, this.lastname, this.email, this.password).subscribe(data => {
        this.successMessage = true;
        this.token = data.value;
        this.Auth.getSchool(localStorage.getItem('userToken')).subscribe(dat => {
          this.Auth.cotractInstruktor(this.token, dat.id).subscribe();
        });
      },
      (err: HttpErrorResponse) => {
        this.errorMessageData = true;
      });

      setTimeout(() => {
        this.successMessage = false;
      }, 1500);
  }

  setTimeout(() => {
    this.errorMessage = false;
    this.errorMessageData = false;
  }, 1500);
}

}
