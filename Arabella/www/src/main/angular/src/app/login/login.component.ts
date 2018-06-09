import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  usersCount: number = 4;
  btnText: string = 'Zaloguj';
  goalText: string = 'Podaj swój e-mail';
  cookie : string;
  
  constructor(private http: HttpClient, private _cookieService:CookieService) { }
 
  ngOnInit() {
  }
  setCookie()
  {
  	this._cookieService.put('cookie',this.cookie);
  }
  deleteCookie()
  {
  	 this._cookieService.remove('cookie');
  }
  sendData() {

    interface LoginResponse {
      token: string;
    }
    var mail = ((document.getElementById("email") as HTMLInputElement).value);
    var pass = ((document.getElementById("password") as HTMLInputElement).value);
    let data = { email: mail, password: pass };
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
 
    this.http.post<LoginResponse>('http://orlean.ski:8090/api/login', data, { headers })
    .subscribe(data => { this.cookie = data.token;
        console.log(this.cookie);
      });

  }

}
 