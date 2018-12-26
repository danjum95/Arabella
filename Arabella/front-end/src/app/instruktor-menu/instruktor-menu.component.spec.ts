import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InstruktorMenuComponent } from './instruktor-menu.component';

describe('InstruktorMenuComponent', () => {
  let component: InstruktorMenuComponent;
  let fixture: ComponentFixture<InstruktorMenuComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstruktorMenuComponent ],
      imports: [HttpClientTestingModule, BrowserModule, FormsModule, ReactiveFormsModule,RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstruktorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
