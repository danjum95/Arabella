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

});
