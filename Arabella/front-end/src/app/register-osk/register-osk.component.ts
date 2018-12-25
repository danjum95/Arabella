import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register-osk',
  templateUrl: './register-osk.component.html',
  styleUrls: ['./register-osk.component.css']
})
export class RegisterOskComponent {
  name: any;
  lastname: any;
  email: any;
  password: any;
  token: any;
  oskName: any;
  registerForm: FormGroup;
  regist = {
    oskName:'',
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
      'oskName': new FormControl(this.regist.oskName, [
        Validators.required,
        Validators.minLength(6)
        ]),
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
      localStorage.setItem('newTokenOsk', data.value);
      this.Auth.addSchools(this.oskName, localStorage.getItem('newTokenOsk')).subscribe();
      setTimeout(() => {
        localStorage.removeItem('newTokenOsk');
        this.router.navigate(['']);
      }, 300);
    });
  }

}
