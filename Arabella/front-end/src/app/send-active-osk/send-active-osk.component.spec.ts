import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendActiveOskComponent } from './send-active-osk.component';

describe('SendActiveOskComponent', () => {
  let component: SendActiveOskComponent;
  let fixture: ComponentFixture<SendActiveOskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendActiveOskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendActiveOskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
