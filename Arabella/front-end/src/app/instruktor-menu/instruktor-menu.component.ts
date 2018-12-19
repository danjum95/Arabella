import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-instruktor-menu',
  templateUrl: './instruktor-menu.component.html',
  styleUrls: ['./instruktor-menu.component.css']
})
export class InstruktorMenuComponent {

  constructor(private router: Router) { }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    this.router.navigate(['']);
  }

}
