import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KursantListComponent } from './kursant-list.component';

describe('KursantListComponent', () => {
  let component: KursantListComponent;
  let fixture: ComponentFixture<KursantListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KursantListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KursantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
