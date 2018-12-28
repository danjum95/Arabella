import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-instruktor',
  templateUrl: './register-instruktor.component.html',
  styleUrls: ['./register-instruktor.component.css']
})
export class RegisterInstruktorComponent {
  name: any;
  lastname: any;
  email: any;
  password: any;
  token: any;
  myForm: FormGroup;

  isRegistered = false;

  constructor(private Auth: AuthorizationService, private fb: FormBuilder) {
    this.myForm = fb.group({
      'name': [null, Validators.required],
      'lastname': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.pattern('.+[@].+[\.].+')])],
      'password': [null, Validators.required]
    });
  }

  register() {

    this.Auth.addUsers(this.name, this.lastname, this.email, this.password).subscribe(data => {
      this.token = data.value;
      this.Auth.getSchool(localStorage.getItem('userToken')).subscribe(dat => {
        this.Auth.cotractInstruktor(this.token, dat.id).subscribe();
        this.isRegistered = true;
      });
    });
  }

}
