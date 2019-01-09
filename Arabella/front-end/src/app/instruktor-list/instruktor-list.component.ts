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
  email: any;

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
    this.columns = ['Imię', 'Nazwisko', 'E-mail'];

    this.Auth.getSchool(localStorage.getItem('userToken')).subscribe(data => {
      this.allInstruktors$ = this.Auth.getInstructors(localStorage.getItem('userToken'), data.id);
    });
  }

  send(event) {
    event.preventDefault();
    this.email = event.target.innerHTML;
    this.Auth.getTypeOfUser(localStorage.getItem('userToken')).subscribe(data =>  {
      switch (data) {
        case 0:
          this.router.navigate(['oskMenu/message']);
          break;
        case 1:
          this.router.navigate(['instruktorMenu/message']);
          break;
        case 2:
        this.router.navigate(['kursantMenu/message']);
        break;
      }
    });
  }
}
