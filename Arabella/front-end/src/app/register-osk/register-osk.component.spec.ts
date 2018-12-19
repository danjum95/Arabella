import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOskComponent } from './register-osk.component';

describe('RegisterOskComponent', () => {
  let component: RegisterOskComponent;
  let fixture: ComponentFixture<RegisterOskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterOskComponent ]
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
});
