import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-osk-menu',
  templateUrl: './osk-menu.component.html',
  styleUrls: ['./osk-menu.component.css']
})
export class OskMenuComponent {

  constructor(private router: Router) { }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    this.router.navigate(['']);
  }

}
