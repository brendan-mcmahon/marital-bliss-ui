import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndGameSummaryComponent } from './end-game-summary.component';

describe('EndGameSummaryComponent', () => {
  let component: EndGameSummaryComponent;
  let fixture: ComponentFixture<EndGameSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndGameSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndGameSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
