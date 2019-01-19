import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, RequestOptions } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InstruktorListKursantComponent } from './instruktor-list-kursant.component';
import { AuthorizationService } from './../authorization.service';

describe('InstruktorListKursantComponent', () => {
  let component: InstruktorListKursantComponent;
  let fixture: ComponentFixture<InstruktorListKursantComponent>;
  let service: AuthorizationService = null;
  let backend: MockBackend = null;
  let httpMock: HttpTestingController;
  let de: DebugElement;
  let el: HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstruktorListKursantComponent ],
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
    fixture = TestBed.createComponent(InstruktorListKursantComponent);
    component = fixture.componentInstance;
    service = auth;
    backend = mockBackend;
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get instruktor list', () => {
    service.getSchool("testowytoken").subscribe(data => {
      expect(service.getInstructors("testowytoken", data.id)).toBeDefined();
    });
  });

  it('shouldnt get instruktor list', () => {
    service.getSchool("").subscribe(data => {
      expect(service.getInstructors("", data.id)).toBeNaN();
    });
  });
});
