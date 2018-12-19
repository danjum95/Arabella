import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';

@Component({
  selector: 'app-kursant-menu',
  templateUrl: './kursant-menu.component.html',
  styleUrls: ['./kursant-menu.component.css']
})
export class KursantMenuComponent {

  constructor(private router: Router, private Auth: AuthorizationService) { }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    this.router.navigate(['']);
  }

}
