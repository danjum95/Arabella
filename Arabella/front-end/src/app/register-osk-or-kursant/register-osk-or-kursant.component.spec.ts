import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOskOrKursantComponent } from './register-osk-or-kursant.component';

describe('RegisterOskOrKursantComponent', () => {
  let component: RegisterOskOrKursantComponent;
  let fixture: ComponentFixture<RegisterOskOrKursantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterOskOrKursantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterOskOrKursantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
