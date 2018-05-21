import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usersCount : number = 4;
  btnText : string = 'Zaloguj';
  goalText : string = 'Podaj swój e-mail';


  constructor() { }

  ngOnInit() {
  }

}
