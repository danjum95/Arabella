import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {Location} from '@angular/common';
import {fakeAsync, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageComponent } from '../message/message.component';
import { SettingsComponent } from '../settings/settings.component';
import {InstruktorListComponent} from '../instruktor-list/instruktor-list.component';


import { InstruktorMenuComponent } from './instruktor-menu.component';

describe('InstruktorMenuComponent', () => {
  let component: InstruktorMenuComponent;
  let fixture: ComponentFixture<InstruktorMenuComponent>;
  let location: Location;
  let router: Router;
  let de: DebugElement;
  let el: HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstruktorMenuComponent,MessageComponent,SettingsComponent,InstruktorListComponent ],
      imports: [HttpClientTestingModule, BrowserModule, FormsModule, ReactiveFormsModule,RouterTestingModule.withRoutes([
        {path: 'message', component: MessageComponent}, 
        {path: 'settings', component: SettingsComponent},
        {path: 'instruktorList', component: InstruktorListComponent},
      ])],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstruktorMenuComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router); 
    location = TestBed.get(Location);
    de = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
    router.initialNavigation();
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

  it('navigate to "" redirects you to /message', fakeAsync(() => { 
      let links = fixture.nativeElement.querySelectorAll('a');
      links[0].click();
      tick(50); 
      expect(location.path()).toBe('/message');
  }));
  
  it('navigate to "" redirects you to /settings', fakeAsync(() => { 
    let links = fixture.nativeElement.querySelectorAll('a');
    links[3].click();
    tick(50); 
    expect(location.path()).toBe('/settings'); 
  }));

  it('navigate to "" redirects you to /instruktorList', fakeAsync(() => { 
    let links = fixture.nativeElement.querySelectorAll('a');
    links[2].click();
    tick(50); 
    expect(location.path()).toBe('/instruktorList'); 
  }));

});
