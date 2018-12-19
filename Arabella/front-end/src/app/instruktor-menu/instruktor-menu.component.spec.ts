import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstruktorMenuComponent } from './instruktor-menu.component';

describe('InstruktorMenuComponent', () => {
  let component: InstruktorMenuComponent;
  let fixture: ComponentFixture<InstruktorMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstruktorMenuComponent ]
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
