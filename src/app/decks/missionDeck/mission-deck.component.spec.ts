import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionDeckComponent } from './mission-deck.component';

describe('DeckComponent', () => {
  let component: MissionDeckComponent;
  let fixture: ComponentFixture<MissionDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionDeckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
