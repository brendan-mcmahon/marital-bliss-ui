import { Component, OnInit, Input } from '@angular/core';
import { Reward } from 'src/app/models/reward';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-reward-list',
  templateUrl: './reward-list.component.html',
  styleUrls: ['./reward-list.component.scss']
})
export class RewardListComponent implements OnInit {

  @Input() cards: Reward[];
  @Input() name: string;
  @Input() buttonPhase: string;
  cardsDisplay: Reward[];

  showRewards = false;
  showDelivered = false;
  chevronDown = faChevronDown;
  chevronUp = faChevronUp;

  constructor(public matchService: MatchService) { }

  ngOnInit() {
    if (this.cards) {
      this.populateDisplay();
    }
  }

  private populateDisplay() {
    this.cardsDisplay = this.showDelivered
      ? [...this.cards]
      : [...this.cards.filter(md => md.status === 'undelivered')];
  }

  toggleShowDelivered() {
    console.log(`toggle show delivered ${this.showDelivered}`);
    this.showDelivered = !this.showDelivered;
    this.populateDisplay();
  }

  toggleShowRewards() {
    console.log(`toggle show rewards ${this.showRewards}`);
    this.showRewards = !this.showRewards;
    this.populateDisplay();
  }
}
