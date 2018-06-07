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
  data = '';
  constructor(private http: HttpClient){

  }

  getData() {
    this.http.get<UserResponse>('https://api.github.com/users/seeschweiler').subscribe(data => {
      console.log("User Login: " + data.login);
      console.log("Bio: " + data.bio);
      console.log("Company: " + data.company);
    });
  }

  sendData()
  {

	 interface LoginResponse {
	  accessToken: string;
	  accessExpiration: number;
	}
  	   this.http.post('http://orlean.ski:8090/api/login',
		 {'email': 'test@test.pl'}).
		   subscribe(data => { console.log(data.accessToken, data.accessExpiration);
		});
   
  }
  ngOnInit() {
  }

}
