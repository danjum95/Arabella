import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OskMenuComponent } from './osk-menu.component';

describe('OskMenuComponent', () => {
  let component: OskMenuComponent;
  let fixture: ComponentFixture<OskMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OskMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OskMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
