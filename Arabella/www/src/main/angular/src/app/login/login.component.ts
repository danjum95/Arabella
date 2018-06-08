import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usersCount : number = 4;
  btnText : string = 'Zaloguj';
  goalText : string = 'Podaj swój e-mail';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  sendData()
  {

	 interface LoginResponse {
	  token: string;
	  accessExpiration: number;
	}

	var mail = ((document.getElementById("email") as HTMLInputElement).value);
	let data = {email: mail};

  	    this.http.post<LoginResponse>('http://orlean.ski:8090/api/login',
		 data).
		 subscribe(data => { console.log(data.token);
		});
		
  }
}
