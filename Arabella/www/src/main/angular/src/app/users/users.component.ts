import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private http: HttpClient, private _cookieService:CookieService) { }

  id: string;
  name: string;
  surname: string;
  email: string;

  ngOnInit() {
  	this._cookieService.get('cookie');


  	interface ListingUsers {
      surname: string;
      name: string;
      id: string;
      email: string;
    }

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let data = { "cos": "waznego"};
    this.http.post<ListingUsers>('http://orlean.ski:8090/api/users', data, { headers })
    .subscribe(data => {
        console.log(this.surname = data[0].surname,this.name = data[0].name,this.id = data[0].id,this.email = data[0].email);
      });

  }
}
