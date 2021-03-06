import { AuthorizationService } from './../authorization.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { instruktorListInterface } from '../interface/instruktorListInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instruktor-list',
  templateUrl: './instruktor-list.component.html',
  styleUrls: ['./instruktor-list.component.css']
})
export class InstruktorListComponent implements OnInit {

  allInstruktors$: Observable<Array<instruktorListInterface>>;

  columns: string[];
  authorization: boolean;
  message = false;

  constructor(private Auth: AuthorizationService, private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  kursanci() {
    this.Auth.getTypeOfUser(localStorage.getItem('userToken')).subscribe(data =>  {
      switch (data) {
        case 0:
          this.router.navigate(['oskMenu/kursantList']);
          break;
        case 1:
          this.router.navigate(['instruktorMenu/kursantList']);
          break;
      }
    });
  }

  loadData () {
    this.Auth.getTypeOfUser(localStorage.getItem('userToken')).subscribe(data =>  {
      if (data === 0) {
        this.authorization = true;
        this.columns = ['Imię', 'Nazwisko', 'E-mail', 'Usuń'];
      } else {
        this.columns = ['Imię', 'Nazwisko', 'E-mail'];
        this.authorization = false;
      }
    });

    this.Auth.getSchool(localStorage.getItem('userToken')).subscribe(data => {
      this.allInstruktors$ = this.Auth.getInstructors(localStorage.getItem('userToken'), data.id);
    });
  }

  id(user) {
    this.message = true;
    this.Auth.delete(user.id, localStorage.getItem('userToken')).subscribe();

    setTimeout(() => {
      this.message = false;
    }, 1500);
  }
}
