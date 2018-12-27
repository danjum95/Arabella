import { AuthorizationService } from './../authorization.service';
import { Router} from '@angular/router';
import { Component} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: any;
  lastname: any;
  email: any;
  password: any;
  myForm: FormGroup;
  isLoginError = false;

  constructor(private router: Router, private Auth: AuthorizationService, private fb: FormBuilder) {
    this.myForm = fb.group({
      'name': [null, Validators.required],
      'lastname': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.pattern('.+[@].+[\.].+')])],
      'password': [null, Validators.required]
    });
  }

  register() {
      this.Auth.addUsers(this.name, this.lastname, this.email, this.password).subscribe(data => {
        localStorage.setItem('newUser', data.value);
      }, (error) => this.isLoginError = true);

    if (!(this.isLoginError === true)) {
      this.router.navigate(['oskList']);
    }
  }
}
