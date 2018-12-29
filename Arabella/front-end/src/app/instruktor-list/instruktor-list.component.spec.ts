import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InstruktorListComponent } from './instruktor-list.component';
import { AuthorizationService } from './../authorization.service';


describe('InstruktorListComponent', () => {
  let component: InstruktorListComponent;
  let fixture: ComponentFixture<InstruktorListComponent>;
  let service: AuthorizationService;
  let httpMock: HttpTestingController;
  let de: DebugElement;
  let el: HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstruktorListComponent ],
      imports: [HttpClientTestingModule, BrowserModule, FormsModule, ReactiveFormsModule,RouterTestingModule],
      providers: [AuthorizationService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstruktorListComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AuthorizationService);
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

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

  it('should checkuserid', () => {
    service.getTypeOfUser("testowytoken").subscribe(data => {
      expect(data).toMatch("2");
    });
    service.getTypeOfUser("testowytoken2").subscribe(data => {
      expect(data).toMatch("1");
    });
    service.getTypeOfUser("testowytoken3").subscribe(data => {
      expect(data).toMatch("0");
    });
  });
});
