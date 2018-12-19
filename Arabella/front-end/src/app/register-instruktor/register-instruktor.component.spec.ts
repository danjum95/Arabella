import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInstruktorComponent } from './register-instruktor.component';

describe('RegisterInstruktorComponent', () => {
  let component: RegisterInstruktorComponent;
  let fixture: ComponentFixture<RegisterInstruktorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterInstruktorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInstruktorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
