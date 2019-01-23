import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-send-active-osk',
  templateUrl: './send-active-osk.component.html',
  styleUrls: ['./send-active-osk.component.css']
})
export class SendActiveOskComponent {

  activeControl = new FormControl('', [Validators.required]);

  active: string;
  errorMessage = false;
  errorMessage2 = false;

  constructor(private auth: AuthorizationService, private router: Router) { }

  getErrorMessageActive() {
    return this.activeControl.hasError('required') ? 'Pole nie może być puste!' :
            '';
  }

  send() {
    if (this.activeControl.invalid) {
      this.errorMessage = true;
    } else {
      this.auth.activeUser(this.active).subscribe(() => {
        this.auth.addSchools(localStorage.getItem('oskName'), localStorage.getItem('newTokenOsk')).subscribe();
        setTimeout(() => {
          localStorage.removeItem('newTokenOsk');
          localStorage.removeItem('oskName');
          this.router.navigate(['']);
        }, 300);
      },
      (err: HttpErrorResponse) => {
        this.errorMessage2 = true;

        setTimeout(() => {
          this.errorMessage2 = false;
        }, 1500);
      });
    }
  }
}

