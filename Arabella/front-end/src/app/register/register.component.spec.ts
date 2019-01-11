import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, RequestOptions } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { AuthorizationService } from './../authorization.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: AuthorizationService = null;
  let backend: MockBackend = null;
  let httpMock: HttpTestingController;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
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
    fixture = TestBed.createComponent(RegisterComponent);
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
    component.myForm.controls['name'].setValue('');
    component.myForm.controls['lastname'].setValue('');
    component.myForm.controls['email'].setValue('');
    component.myForm.controls['password'].setValue('');
    expect(component.myForm.valid).toBeFalsy();
  }));

  it('form is invalid partially', async(() => {
    component.myForm.controls['name'].setValue('test');
    component.myForm.controls['lastname'].setValue('TESTOWY');
    component.myForm.controls['email'].setValue('test@test.pl');
    component.myForm.controls['password'].setValue('');
    expect(component.myForm.valid).toBeFalsy();
  }));

  it('form is valid', async(() => {
    component.myForm.controls['name'].setValue('TESTOWY');
    component.myForm.controls['lastname'].setValue('TESTOWY');
    component.myForm.controls['email'].setValue('test@test.pl');
    component.myForm.controls['password'].setValue('123456');
    expect(component.myForm.valid).toBeTruthy();
  }));

  it('should get register successful', () => {
    service.addUsers("Marcin", "Marcinowski", "testowy@testowy.pl", "1234567").subscribe((data: any) => {
      expect(data.token).toBe('abcdefghijklmno');
    });
  });

  it('shouldnt get register successful', () => {
    service.addUsers("Marcin", "", "teststowy.pl", "123567").subscribe((data: any) => {
      expect(data.token).toBeNull();
    });
  });

  it('#register should call endpoint and return it\'s result', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      expect(connection.request.url).toEqual('/users');
      expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
      connection.mockRespond(new Response(options));
      connection.mockRespond(new Response(options));
    });

    service.addUsers("Marcin", "Marcinowski", "testowy@testowy.pl", "1234567")
      .subscribe((response) => {
        expect(response.json()).toEqual({ success: true });
      });
  });

});
