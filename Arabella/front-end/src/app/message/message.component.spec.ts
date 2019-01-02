import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, RequestOptions } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MessageComponent } from './message.component';
import { AuthorizationService } from './../authorization.service';


describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let service: AuthorizationService;
  let backend: MockBackend;
  let httpMock: HttpTestingController;
  let de: DebugElement;
  let el: HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageComponent ],
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
    fixture = TestBed.createComponent(MessageComponent);
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

  it('form invalid', async(() => {
    component.msgForm.controls['to'].setValue('');
    component.msgForm.controls['title'].setValue('');
    component.msgForm.controls['textMessage'].setValue('');
    expect(component.msgForm.valid).toBeFalsy();
  }));

  it('form is valid', async(() => {
    component.msgForm.controls['to'].setValue('test1@test.pl');
    component.msgForm.controls['title'].setValue('tytul123');
    component.msgForm.controls['textMessage'].setValue('sadadsdsadadasdas');
    expect(component.msgForm.valid).toBeTruthy();
  }));

  it('form is invalid partially', async(() => {
    component.msgForm.controls['to'].setValue('testowy');
    component.msgForm.controls['title'].setValue('tytul123');
    component.msgForm.controls['textMessage'].setValue('123');
    expect(component.msgForm.valid).toBeFalsy();
  }));
});
