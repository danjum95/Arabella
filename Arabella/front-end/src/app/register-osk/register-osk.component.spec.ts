import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, RequestOptions } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterOskComponent } from './register-osk.component';
import { AuthorizationService } from './../authorization.service';


describe('RegisterOskComponent', () => {
  let component: RegisterOskComponent;
  let fixture: ComponentFixture<RegisterOskComponent>;
  let service: AuthorizationService = null;
  let backend: MockBackend = null;
  let httpMock: HttpTestingController;
  let de: DebugElement;
  let el: HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterOskComponent ],
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
    fixture = TestBed.createComponent(RegisterOskComponent);
    component = fixture.componentInstance;
    service = auth;
    backend = mockBackend;
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid', async(() => {
    component.myForm.controls['oskName'].setValue('');
    component.myForm.controls['name'].setValue('');
    component.myForm.controls['lastname'].setValue('');
    component.myForm.controls['email'].setValue('');
    component.myForm.controls['password'].setValue('');
    expect(component.myForm.valid).toBeFalsy();
  }));

  it('form invalid partially', async(() => {
    component.myForm.controls['oskName'].setValue('MOJE_OSK');
    component.myForm.controls['name'].setValue('');
    component.myForm.controls['lastname'].setValue('');
    component.myForm.controls['email'].setValue('mail');
    component.myForm.controls['password'].setValue('testowy');
    expect(component.myForm.valid).toBeFalsy();
  }));

  it('form is valid', async(() => {
    component.myForm.controls['oskName'].setValue('MOJE_OSK');
    component.myForm.controls['name'].setValue('TESTOWY');
    component.myForm.controls['lastname'].setValue('TESTOWY');
    component.myForm.controls['email'].setValue('test@test.pl');
    component.myForm.controls['password'].setValue('123456');
    expect(component.myForm.valid).toBeTruthy();
  }));

  it('should get register school successful', () => {
    service.addSchools("Moje OSK", "12345678910").subscribe((data: any) => {
      expect(data.value).toBe('abcdefghijklmno');
    });
  });

  it('#register  should call endpoint and return it\'s result', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      expect(connection.request.url).toEqual('/users');
      expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
      connection.mockRespond(new Response(options));
      connection.mockRespond(new Response(options));
    });

    service.addSchools("Moje OSK", "12345678910").subscribe((response) => {
      expect(response.json()).toEqual({ success: true });
    });
  });

});
