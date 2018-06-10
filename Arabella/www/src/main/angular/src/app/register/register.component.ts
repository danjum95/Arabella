import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private _cookieService:CookieService) { }

  role: any;
  name: string;
  surname: string;
  email: string;
  password: string;
  checkpass: string;



  ngOnInit() {
  	this._cookieService.get('cookie');
  }
  sendData()
  {

  	interface AddUser {
      surname: string;
      name: string;
      id: string;
      email: string;
    }
  	var imie = ((document.getElementById("name") as HTMLInputElement).value);
  	var nazwisko = ((document.getElementById("surname") as HTMLInputElement).value);
  	var mail = ((document.getElementById("email") as HTMLInputElement).value);
    var pass = ((document.getElementById("password") as HTMLInputElement).value);
    var rpass = ((document.getElementById("chkpassword") as HTMLInputElement).value);
    var psl = ((document.getElementById("pesel") as HTMLInputElement).value);
    var rola = ((document.getElementById("list") as HTMLInputElement).value);

    if (pass == rpass)
    {
    let data = {name: imie, surname: nazwisko, email: mail, password: pass, pesel: psl, accountType: rola};
    }

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
 
    this.http.post('http://orlean.ski:8090/api/register', data, { headers })
    .subscribe(data => { console.log("ok");
      });

  }
 }
