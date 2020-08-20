import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndgameAlertComponent } from './endgame-alert.component';

describe('EndgameAlertComponent', () => {
  let component: EndgameAlertComponent;
  let fixture: ComponentFixture<EndgameAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndgameAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndgameAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
