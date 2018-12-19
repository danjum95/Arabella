import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstruktorListComponent } from './instruktor-list.component';

describe('InstruktorListComponent', () => {
  let component: InstruktorListComponent;
  let fixture: ComponentFixture<InstruktorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstruktorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstruktorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
