import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OskListComponent } from './osk-list.component';

describe('OskListComponent', () => {
  let component: OskListComponent;
  let fixture: ComponentFixture<OskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
