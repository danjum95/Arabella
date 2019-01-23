import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendLinkActiveComponent } from './send-link-active.component';

describe('SendLinkActiveComponent', () => {
  let component: SendLinkActiveComponent;
  let fixture: ComponentFixture<SendLinkActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendLinkActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendLinkActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
