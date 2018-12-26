import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KursantListComponent } from './kursant-list.component';

describe('KursantListComponent', () => {
  let component: KursantListComponent;
  let fixture: ComponentFixture<KursantListComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KursantListComponent ],
      imports: [HttpClientTestingModule, BrowserModule, FormsModule, ReactiveFormsModule,RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KursantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
