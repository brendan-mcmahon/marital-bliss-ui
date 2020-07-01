import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessMissionComponent } from './guess-mission.component';

describe('GuessMissionComponent', () => {
  let component: GuessMissionComponent;
  let fixture: ComponentFixture<GuessMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuessMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
