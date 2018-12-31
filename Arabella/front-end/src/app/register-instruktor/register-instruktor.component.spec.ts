import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, RequestOptions } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterInstruktorComponent } from './register-instruktor.component';
import { AuthorizationService } from './../authorization.service';


describe('RegisterInstruktorComponent', () => {
  let component: RegisterInstruktorComponent;
  let fixture: ComponentFixture<RegisterInstruktorComponent>;
  let service: AuthorizationService = null;
  let backend: MockBackend = null;
  let httpMock: HttpTestingController;
  let de: DebugElement;
  let el: HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterInstruktorComponent ],
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
    fixture = TestBed.createComponent(RegisterInstruktorComponent);
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
    component.myForm.controls['name'].setValue('');
    component.myForm.controls['lastname'].setValue('');
    component.myForm.controls['email'].setValue('');
    component.myForm.controls['password'].setValue('');
    expect(component.myForm.valid).toBeFalsy();
  }));

  it('form invalid partially', async(() => {
    component.myForm.controls['name'].setValue('');
    component.myForm.controls['lastname'].setValue('testuje');
    component.myForm.controls['email'].setValue('');
    component.myForm.controls['password'].setValue('12345678900');
    expect(component.myForm.valid).toBeFalsy();
  }));

  it('form is valid', async(() => {
    component.myForm.controls['name'].setValue('TESTOWY');
    component.myForm.controls['lastname'].setValue('TESTOWY');
    component.myForm.controls['email'].setValue('test@test.pl');
    component.myForm.controls['password'].setValue('123456');
    expect(component.myForm.valid).toBeTruthy();
  }));

  it('should get register instructor successful', () => {
    service.addUsers("Marcin", "Marcinowski", "testowy@testowy.pl", "1234567").subscribe((data: any) => {
      expect(data.value).toBe('abcdefghijklmno');
    });
  });

  it('should get full path to register successful', () => {
    service.addUsers("Marcin", "Marcinowski", "testowy@testowy.pl", "1234567").subscribe(data => {
      service.getSchool(data.token).subscribe(dat => {
        service.cotractInstruktor(data.token, dat.id).subscribe(data => {
          expect(data).toBeDefined();
        })
        this.isRegistered = true;
      });
    });
  });
});
