import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardDeckComponent } from './reward-deck.component';

describe('RewardDeckComponent', () => {
  let component: RewardDeckComponent;
  let fixture: ComponentFixture<RewardDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardDeckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
