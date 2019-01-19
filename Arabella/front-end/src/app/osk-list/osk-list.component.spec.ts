import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, RequestOptions } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OskListComponent } from './osk-list.component';
import { AuthorizationService } from './../authorization.service';

describe('OskListComponent', () => {
  let component: OskListComponent;
  let fixture: ComponentFixture<OskListComponent>;
  let service: AuthorizationService = null;
  let backend: MockBackend = null;
  let httpMock: HttpTestingController;
  let de: DebugElement;
  let el: HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OskListComponent ],
      imports: [HttpClientTestingModule, BrowserModule, FormsModule, ReactiveFormsModule,RouterTestingModule],
      providers: [MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },AuthorizationService],
    })
    .compileComponents();
  }));

  beforeEach(inject([AuthorizationService, MockBackend], (auth, mockBackend) => {
    fixture = TestBed.createComponent(OskListComponent);
    component = fixture.componentInstance;
    service = auth;
    backend = mockBackend;
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get contract with school', () => {
      expect(service.cotractKursant("abcdefghijkl", 1).subscribe()).toBeDefined();
  });

  it('should get contract with school', () => {
    expect(service.getSchools()).toBeDefined();
  });

  it('should get school list data', () => {
    let profileInfo = { email: 'student@student.pl', firstName: 'Student', lastName: 'Student' };
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({ body: profileInfo });
      expect(connection.request.url).toEqual(service.url + '/users/user/info');
      expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
      connection.mockRespond(new Response(options));
    });
  
    service.getSchools().subscribe((response) => {
      expect(response).toBeDefined();
    });
  });
});
