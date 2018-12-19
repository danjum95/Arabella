import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../authorization.service';
import { instruktorListInterface } from '../interface/instruktorListInterface';

@Component({
  selector: 'app-kursant-list',
  templateUrl: './kursant-list.component.html',
  styleUrls: ['./kursant-list.component.css']
})
export class KursantListComponent implements OnInit {

  allKursants$: Observable<Array<instruktorListInterface>>;

  columns: string[];

  constructor(private Auth: AuthorizationService, private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  instruktorzy() {
    this.Auth.getTypeOfUser(localStorage.getItem('userToken')).subscribe(data =>  {
      switch (data) {
        case 0:
          this.router.navigate(['oskMenu/instruktorList']);
          break;
        case 1:
          this.router.navigate(['instruktorMenu/instruktorList']);
          break;
      }
    });
  }

  loadData () {
    this.columns = ['Imię', 'Nazwisko', 'E-mail'];

    this.Auth.getSchool(localStorage.getItem('userToken')).subscribe(data => {
      this.allKursants$ = this.Auth.getStudents(localStorage.getItem('userToken'), data.id);
    });
  }

}
