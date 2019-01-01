import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, RequestOptions } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SettingsComponent } from './settings.component';
import { AuthorizationService } from './../authorization.service';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let service: AuthorizationService = null;
  let backend: MockBackend = null;
  let httpMock: HttpTestingController;
  let de: DebugElement;
  let el: HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsComponent ],
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
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    service = auth;
    backend = mockBackend;
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get change mail successful', () => {
    service.changeMail("nowymail@test.pl","tescik1234567").subscribe((data: any) => {
      expect(data).toBe('OK');
    });
  });

  it('should get change password successful', () => {
    service.changePassword("mynewpassword","tescik1234567").subscribe((data: any) => {
      expect(data).toBe('OK');
    });
  });

  it('should get user mail, name and surname propoerly', () => {
    service.getUserDetails("blablablabla").subscribe(data => {
    expect(data.email).toBe('test@test.pl');
    expect(data.firstName).toBe('Test');;
    expect(data.lastName).toBe('testowy');
    });
  });

  it('should get profile data of user', () => {
    let profileInfo = { email: 'student@student.pl', firstName: 'Student', lastName: 'Student' };
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({ body: profileInfo });
      expect(connection.request.url).toEqual(service.url + '/users/user/info');
      expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
      connection.mockRespond(new Response(options));
    });
  
    service.getUserDetails({token:'28a4b466fdc590c'}).subscribe((response) => {
      expect(response.json()).toEqual({ success: true });
    });
  });

});
