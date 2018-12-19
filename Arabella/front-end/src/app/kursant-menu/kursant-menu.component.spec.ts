import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KursantMenuComponent } from './kursant-menu.component';

describe('KursantMenuComponent', () => {
  let component: KursantMenuComponent;
  let fixture: ComponentFixture<KursantMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KursantMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KursantMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
