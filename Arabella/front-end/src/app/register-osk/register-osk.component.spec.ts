import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterOskComponent } from './register-osk.component';

describe('RegisterOskComponent', () => {
  let component: RegisterOskComponent;
  let fixture: ComponentFixture<RegisterOskComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterOskComponent ],
      imports: [HttpClientTestingModule, BrowserModule, FormsModule, ReactiveFormsModule,RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterOskComponent);
    component = fixture.componentInstance;
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

});
