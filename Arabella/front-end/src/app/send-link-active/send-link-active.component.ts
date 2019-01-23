import { Router } from '@angular/router';
import { AuthorizationService } from './../authorization.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-send-link-active',
  templateUrl: './send-link-active.component.html',
  styleUrls: ['./send-link-active.component.css']
})
export class SendLinkActiveComponent {

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
      this.auth.activeUser(this.active).subscribe(data => {
        setTimeout(() => {
          this.router.navigate(['oskList']);
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
