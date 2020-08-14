import { Component, OnInit, Input } from '@angular/core';
import { Reward } from 'src/app/models/reward';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { MatchService } from 'src/app/match.service';

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
  }

  toggleShowDelivered() {
    console.log(`toggle show delivered ${this.showDelivered}`);
    this.showDelivered = !this.showDelivered;
    this.cardsDisplay = this.showDelivered
      ? [...this.cards]
      : [...this.cards.filter(md => md.status === 'undelivered')];
  }
}
