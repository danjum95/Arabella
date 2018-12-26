import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterOskComponent } from './register-osk.component';
import { AuthorizationService } from './../authorization.service';


describe('RegisterOskComponent', () => {
  let component: RegisterOskComponent;
  let fixture: ComponentFixture<RegisterOskComponent>;
  let service: AuthorizationService;
  let httpMock: HttpTestingController;
  let de: DebugElement;
  let el: HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterOskComponent ],
      imports: [HttpClientTestingModule, BrowserModule, FormsModule, ReactiveFormsModule,RouterTestingModule],
      providers: [AuthorizationService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterOskComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AuthorizationService);
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid', async(() => {
    component.registerForm.controls['oskName'].setValue('');
    component.registerForm.controls['name'].setValue('');
    component.registerForm.controls['lastname'].setValue('');
    component.registerForm.controls['email'].setValue('');
    component.registerForm.controls['password'].setValue('');
    expect(component.registerForm.valid).toBeFalsy();
  }));

  it('form invalid partially', async(() => {
    component.registerForm.controls['oskName'].setValue('MOJE_OSK');
    component.registerForm.controls['name'].setValue('');
    component.registerForm.controls['lastname'].setValue('');
    component.registerForm.controls['email'].setValue('mail');
    component.registerForm.controls['password'].setValue('testowy');
    expect(component.registerForm.valid).toBeFalsy();
  }));

  it('form is valid', async(() => {
    component.registerForm.controls['oskName'].setValue('MOJE_OSK');
    component.registerForm.controls['name'].setValue('TESTOWY');
    component.registerForm.controls['lastname'].setValue('TESTOWY');
    component.registerForm.controls['email'].setValue('test@test.pl');
    component.registerForm.controls['password'].setValue('123456');
    expect(component.registerForm.valid).toBeTruthy();
  }));

  it('should get register school successful', () => {
    service.addSchools("Moje OSK", "12345678910").subscribe((data: any) => {
      expect(data.value).toBe('abcdefghijklmno');
    });
  });

});
