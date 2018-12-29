import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { KursantListComponent } from './kursant-list.component';
import { AuthorizationService } from './../authorization.service';

describe('KursantListComponent', () => {
  let component: KursantListComponent;
  let fixture: ComponentFixture<KursantListComponent>;
  let service: AuthorizationService;
  let httpMock: HttpTestingController;
  let de: DebugElement;
  let el: HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KursantListComponent ],
      imports: [HttpClientTestingModule, BrowserModule, FormsModule, ReactiveFormsModule,RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KursantListComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AuthorizationService);
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get kursants list', () => {
    service.getSchool("testowytoken").subscribe(data => {
      expect(service.getStudents("testowytoken", data.id)).toBeDefined();
    });
  });

  it('shouldnt get kursants list', () => {
    service.getSchool("").subscribe(data => {
      expect(service.getStudents("", data.id)).toBeNull();
    });
  });

  it('should checkuserid', () => {
    service.getTypeOfUser("testowytoken").subscribe(data => {
      expect(data).toMatch("2");
    });
    service.getTypeOfUser("testowytoken2").subscribe(data => {
      expect(data).toMatch("1");
    });
    service.getTypeOfUser("testowytoken3").subscribe(data => {
      expect(data).toMatch("0");
    });
  });

  it('shouldnt checkuserid', () => {
    service.getTypeOfUser("").subscribe(data => {
      expect(data).toBeUndefined();
    });
    service.getTypeOfUser("").subscribe(data => {
      expect(data).toBeUndefined();
    });
    service.getTypeOfUser("").subscribe(data => {
      expect(data).toBeUndefined();
    });
  });
});
