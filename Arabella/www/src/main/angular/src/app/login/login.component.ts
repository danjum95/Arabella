import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  usersCount: number = 4;
  btnText: string = 'Zaloguj';
  goalText: string = 'Podaj swój e-mail';
 
  constructor(private http: HttpClient) { }
 
  ngOnInit() {
  }
 
  sendData() {
 
    interface LoginResponse {
      token: string;
      accessExpiration: number;
    }
 
    var mail = ((document.getElementById("email") as HTMLInputElement).value);
    let data = { email: mail };
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
 
    this.http.post<LoginResponse>('http://orlean.ski:8090/api/login', data, { headers })
    .subscribe(data => {
        console.log(data.token);
      });
 	
  }
}
 