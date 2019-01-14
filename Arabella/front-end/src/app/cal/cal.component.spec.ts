import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import { AuthorizationService } from './../authorization.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, RequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import {MatDialogModule,MatDialogRef} from '@angular/material';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CalComponent } from './cal.component';

describe('CalComponent', () => {
  let component: CalComponent;
  let fixture: ComponentFixture<CalComponent>;
  let service: AuthorizationService = null;
  let backend: MockBackend = null;
  let httpMock: HttpTestingController;
  let de: DebugElement;
  let el: HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalComponent,CalendarComponent ],
      imports: [HttpClientTestingModule, BrowserModule, FormsModule, ReactiveFormsModule,RouterTestingModule,MatDialogModule],
      providers: [MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },AuthorizationService,{provide : MatDialogRef, useValue : {}}],
    })
    .compileComponents();
  }));

  beforeEach(inject([AuthorizationService, MockBackend], (auth, mockBackend) => {
    fixture = TestBed.createComponent(CalComponent);
    component = fixture.componentInstance;
    service = auth;
    backend = mockBackend;
    service = TestBed.get(AuthorizationService);
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get lessons', () => {
    service.getTypeOfUser("testowytoken").subscribe(data =>  {
        service.getSchool("testowytoken").subscribe(dat => {
          service.getLessons("testowytoken", dat.id).subscribe(da => {
            expect(da).toBeDefined();
          });
        });
      });
  });

  it('shouldnt get lessons', () => {
    service.getTypeOfUser("").subscribe(data =>  {
        service.getSchool("").subscribe(dat => {
          service.getLessons("", dat.id).subscribe(da => {
            expect(da).toBeNaN();
          });
        });
      });
  });

  it('#getlessons should call endpoint and return it\'s result', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      expect(connection.request.url).toEqual('/users/user/info');
      expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
      connection.mockRespond(new Response(options));
      connection.mockRespond(new Response(options));
    });

    service.getTypeOfUser("testowytoken").subscribe(data =>  {
      service.getSchool("testowytoken").subscribe(dat => {
        service.getLessons("testowytoken", dat.id).subscribe(da => {
        expect(da.json()).toEqual({ success: true });
      });
  });
});
});

});
