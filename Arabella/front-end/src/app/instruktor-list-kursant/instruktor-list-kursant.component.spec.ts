import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstruktorListKursantComponent } from './instruktor-list-kursant.component';

describe('InstruktorListKursantComponent', () => {
  let component: InstruktorListKursantComponent;
  let fixture: ComponentFixture<InstruktorListKursantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstruktorListKursantComponent ]
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
