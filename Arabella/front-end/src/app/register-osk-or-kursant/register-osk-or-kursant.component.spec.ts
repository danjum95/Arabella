import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {Location} from '@angular/common';
import {fakeAsync, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterOskComponent } from '../register-osk/register-osk.component';
import { RegisterComponent } from '../register/register.component';
import { RegisterOskOrKursantComponent } from './register-osk-or-kursant.component';

describe('RegisterOskOrKursantComponent', () => {
  let component: RegisterOskOrKursantComponent;
  let fixture: ComponentFixture<RegisterOskOrKursantComponent>;
  let location: Location;
  let router: Router;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterOskOrKursantComponent, RegisterComponent, RegisterOskComponent ],
      imports: [HttpClientTestingModule, BrowserModule, FormsModule, ReactiveFormsModule,RouterTestingModule.withRoutes([
        {path: 'registerKursant', component: RegisterComponent}, 
        {path: 'registerOsk', component: RegisterOskComponent}
      ])],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterOskOrKursantComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router); 
    location = TestBed.get(Location);
    de = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fakeAsync works', fakeAsync(() => {
    let promise = new Promise((resolve) => {
      setTimeout(resolve, 10)
    });
    let done = false;
    promise.then(() => done = true);
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('navigate to "" redirects you to /registerKursant', fakeAsync(() => { 
    let links = fixture.nativeElement.querySelectorAll('a');
    links[0].click();
    tick(50); 
    expect(location.path()).toBe('/registerKursant'); 
  }));

  it('navigate to "" redirects you to /registerOsk', fakeAsync(() => { 
    let links = fixture.nativeElement.querySelectorAll('a');
    links[1].click();
    tick(50); 
    expect(location.path()).toBe('/registerOsk'); 
  }));
});
