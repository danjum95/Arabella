import { AuthorizationService } from './../authorization.service';
import { Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';


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
  registerForm: FormGroup;
  regist = {
    name: '',
    lastname: '',
    email:'',
    password:''
  };
  constructor(private Auth: AuthorizationService, private router: Router) {
      this.createForm();
   }


   createForm(): void {
    this.registerForm = new FormGroup({
        'name': new FormControl(this.regist.name, [
              Validators.required,
              Validators.minLength(6)
        ]),
        'lastname': new FormControl(this.regist.lastname, [
            Validators.required,
            Validators.minLength(6)
        ]),
        'email': new FormControl(this.regist.email, [
          Validators.required,
          Validators.email
        ]),
        'password': new FormControl(this.regist.password, [
          Validators.required,
          Validators.minLength(6)
        ]),
    });
}

  register() {

    this.Auth.addUsers(this.name, this.lastname, this.email, this.password).subscribe(data => {
      localStorage.setItem('newUser', data.value);
    });

    this.router.navigate(['oskList']);
  }
}
