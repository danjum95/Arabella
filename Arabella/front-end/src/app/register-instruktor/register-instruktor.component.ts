import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';

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

  isRegistered = false;
  registerForm: FormGroup;
  regist = {
    name: '',
    lastname: '',
    email:'',
    password:''
  };
  constructor(private Auth: AuthorizationService) {
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
      this.token = data.value
      this.Auth.getSchool(localStorage.getItem('userToken')).subscribe(data => {
        this.Auth.cotractInstruktor(this.token, data.id).subscribe();
        this.isRegistered = true;
      })
    });
  }

}
