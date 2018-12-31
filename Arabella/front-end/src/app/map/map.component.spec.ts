import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, RequestOptions } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MapComponent } from './map.component';
import { AuthorizationService } from './../authorization.service';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let service: AuthorizationService = null;
  let backend: MockBackend = null;
  let httpMock: HttpTestingController;
  let lessons: string[] = [];
  let de: DebugElement;
  let el: HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComponent ],
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
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    service = auth;
    backend = mockBackend;
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get list of map', () => {
    service.getSchool("instruktqwer").subscribe((da: any) => {
      service.getLessons(localStorage.getItem("instruktqwer"), da.id).subscribe(dat => {
        for (var i = 0; i < dat.length; i++)
        {
          this.lessonsId.push(dat[i].id);
        }
        expect(service.getMap(this.lessons[this.lessons.length-1])).toBeDefined();
    });
  });
  });

  it('shouldnt get list of map', () => {
    service.getSchool("").subscribe((da: any) => {
      service.getLessons(localStorage.getItem(""), da.id).subscribe(dat => {
        for (var i = 0; i < dat.length; i++)
        {
          this.lessonsId.push(dat[i].id);
        }
        expect(service.getMap(this.lessons[this.lessons.length-1])).toBeNull();
    });
  });
  });
});
