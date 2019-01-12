import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-osk',
  templateUrl: './register-osk.component.html',
  styleUrls: ['./register-osk.component.css']
})
export class RegisterOskComponent {

  errorMessage = false;
  errorDataMessage = false;
  successMessage = false;
  name: any;
  lastname: any;
  email: any;
  password: any;
  token: any;
  oskName: any;
  myForm: FormGroup;

  constructor(private Auth: AuthorizationService, private router: Router, private fb: FormBuilder) {
    this.myForm = fb.group({
      'oskName': [null, Validators.required],
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
        localStorage.setItem('newTokenOsk', data.value);
        this.Auth.addSchools(this.oskName, localStorage.getItem('newTokenOsk')).subscribe();
        setTimeout(() => {
          this.successMessage = false;
          localStorage.removeItem('newTokenOsk');
          this.router.navigate(['']);
        }, 1000);
      },
      (err: HttpErrorResponse) => {
        this.errorDataMessage = true;
      });
    }

    setTimeout(() => {
      this.errorMessage = false;
      this.errorDataMessage = false;
    }, 2000);
  }

}
