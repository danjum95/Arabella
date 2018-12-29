import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { AuthorizationService } from './../authorization.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: AuthorizationService;
  let httpMock: HttpTestingController;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [HttpClientTestingModule, BrowserModule, FormsModule, ReactiveFormsModule,RouterTestingModule],
      providers: [AuthorizationService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AuthorizationService);
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

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
      expect(data.value).toBe('abcdefghijklmno');
    });
  });

  it('shouldnt get register successful', () => {
    service.addUsers("Marcin", "", "teststowy.pl", "123567").subscribe((data: any) => {
      expect(data.value).toBeNull();
    });
  });

});
