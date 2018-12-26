import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InstruktorListKursantComponent } from './instruktor-list-kursant.component';

describe('InstruktorListKursantComponent', () => {
  let component: InstruktorListKursantComponent;
  let fixture: ComponentFixture<InstruktorListKursantComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstruktorListKursantComponent ],
      imports: [HttpClientTestingModule, BrowserModule, FormsModule, ReactiveFormsModule,RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstruktorListKursantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
