import { Component, OnInit, Inject } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-lessons',
  templateUrl: './add-lessons.component.html',
  styleUrls: ['./add-lessons.component.css']
})
export class AddLessonsComponent {
  email: any;
  dat: any;
  hours: any;
  minutes: any;

  constructor(protected Auth: AuthorizationService, public dialogRef: MatDialogRef<AddLessonsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     }

  save() {
    const minutesAsMiliseconds = this.minutes * 60000 * 2;
    const dat1 = this.dat.split('.');
    const dat2 = dat1[0] + 'T' + this.hours + ':00';
    const date = new Date(dat2);
    const dateAsTimestamp = date.valueOf();
    const endDateAsTimestamp = dateAsTimestamp + minutesAsMiliseconds;
    const dateToSave = new Date(endDateAsTimestamp);

    this.Auth.generalInfo(localStorage.getItem('userToken'), this.email).subscribe(data => {
      this.Auth.addLessons(localStorage.getItem('userToken'), data.id, dateToSave.toISOString().split('.')[0], dat2).subscribe();
    });
    this.dialogRef.close();
  }

}
