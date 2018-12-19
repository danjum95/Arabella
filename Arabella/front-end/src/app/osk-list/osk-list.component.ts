import { AuthorizationService } from './../authorization.service';
import { Component, OnInit } from '@angular/core';
import { oskListInterface } from '../interface/oskListInterface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-osk-list',
  templateUrl: './osk-list.component.html',
  styleUrls: ['./osk-list.component.css']
})
export class OskListComponent implements OnInit {
  allOsk$: Observable<Array<oskListInterface>>;

  constructor(private Auth: AuthorizationService, private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.allOsk$ = this.Auth.getSchools();
  }

  id(event) {
    this.Auth.cotractKursant(localStorage.getItem('newUser'), event.target.id);
    setTimeout(() => {
      localStorage.removeItem('newUser');
      this.router.navigate(['']);
    }, 500);
  }

}
