import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, RequestOptions } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { AuthorizationService } from './../authorization.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthorizationService = null;
  let backend: MockBackend = null;
  let httpMock: HttpTestingController;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientTestingModule, BrowserModule, FormsModule, ReactiveFormsModule,RouterTestingModule,],
      providers: [MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        AuthorizationService],
    })
    .compileComponents();
  }));

  beforeEach(inject([AuthorizationService, MockBackend], (auth, mockBackend) => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = auth;
    backend = mockBackend;
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  }));
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.myForm.valid).toBeFalsy();
  });

  it('form invalid', async(() => {
    component.myForm.controls['email'].setValue('test');
    component.myForm.controls['password'].setValue('');
    expect(component.myForm.valid).toBeFalsy();
  }));

  it('form is valid', async(() => {
    component.myForm.controls['email'].setValue('kurs@kurs.pl');
    component.myForm.controls['password'].setValue('1234567');
    expect(component.myForm.valid).toBeTruthy();
  }));

  it('should get login successful', () => {
    service.login("student@student.pl","student").subscribe((data: any) => {
      expect(data.userId).toBe(4);
    });
  });

  it('shouldnt get login successful', () => {
    service.login("student@student.pl",null).subscribe((data: any) => {
      expect(data.statusCode).toEqual(404);
    });
  });

});
