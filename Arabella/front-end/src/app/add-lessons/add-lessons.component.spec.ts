import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDialogModule,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { AddLessonsComponent } from './add-lessons.component';

describe('AddLessonsComponent', () => {
  let component: AddLessonsComponent;
  let fixture: ComponentFixture<AddLessonsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLessonsComponent],
      imports:[HttpClientTestingModule, MatDialogModule, FormsModule ],
      providers: [{provide : MatDialogRef, useValue : {}},{provide: MAT_DIALOG_DATA, useValue: {}}, 
        {provide: MatDialogRef, useValue: {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLessonsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
