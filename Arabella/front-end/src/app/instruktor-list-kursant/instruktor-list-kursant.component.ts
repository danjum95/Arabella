import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { instruktorListInterface } from '../interface/instruktorListInterface';
import { AuthorizationService } from '../authorization.service';

@Component({
  selector: 'app-instruktor-list-kursant',
  templateUrl: './instruktor-list-kursant.component.html',
  styleUrls: ['./instruktor-list-kursant.component.css']
})
export class InstruktorListKursantComponent implements OnInit {

  allInstruktors$: Observable<Array<instruktorListInterface>>;

  columns: string[];

  constructor(private Auth: AuthorizationService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData () {
    this.columns = ['Imię', 'Nazwisko', 'E-mail'];

    this.Auth.getSchool(localStorage.getItem('userToken')).subscribe(data => {
      this.allInstruktors$ = this.Auth.getInstructors(localStorage.getItem('userToken'), data.id);
    });
  }

}
