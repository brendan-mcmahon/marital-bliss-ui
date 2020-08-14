import { Component, OnInit, } from '@angular/core';
import { ApiService } from '../../api.service';
import { MatchService } from '../../match.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertComponent } from '../../alert/alert.component';
import { Reward } from 'src/app/models/reward';
import { RewardCardComponent } from 'src/app/game/reward-card/reward-card.component';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reward-deck',
  templateUrl: './reward-deck.component.html',
  styleUrls: ['../decks.component.scss', './reward-deck.component.scss', ]
})
export class RewardDeckComponent implements OnInit {

  modalRef: BsModalRef;
  chevronDown = faChevronDown;
  chevronUp = faChevronUp;

  showDeck = false;
  public deck: Reward[];
  public deckDisplay: Reward[];
  selectedReward: Reward;
  filterText = '';
  showRemoved = false;

  constructor(
    private apiService: ApiService,
    public matchService: MatchService,
    private modalService: BsModalService) {
   }

   ngOnInit() {
    this.apiService.getRewardDeck(this.matchService.getMatch().id)
    .subscribe(d => {
      this.deck = d;
      this.deckDisplay = [...this.deck.filter(md => md.status === 'enabled')];
    });
  }

  filterDisplay() {
    if (this.showRemoved) {
      this.deckDisplay = this.filter(this.deck);
    } else {
      this.deckDisplay = this.filter(this.deck.filter(md => md.status === 'enabled'))
    }
  }

  toggleShowRemoved(){
    this.showRemoved = !this.showRemoved;
    this.filterDisplay();
  }

  rewardSelected(reward: Reward) {
    this.selectedReward = reward;
    const initialState = {
        reward,
        buttonPhase: 'edit'
      };
    this.modalRef = this.modalService.show(RewardCardComponent, {initialState});
    this.modalRef.content.rewardStatusUpdated.subscribe((value: any) => {
      this.modalRef.hide();
      this.alert('A message has been sent to your opponent to approve this change.');
    });
  }


  private alert(text: string) {
    this.modalRef = this.modalService.show(AlertComponent, { initialState: { text } });
    this.modalRef.content.closeTrigger.subscribe((_: any) => {
      this.modalRef.hide();
    });
  }

  filter(deck: Reward[]) {
    if (this.filterText !== '') {
      return deck.filter(reward => {
        return  reward.title.match(new RegExp(this.filterText, 'i'))
          || reward.description.match(new RegExp(this.filterText, 'i'))
      });
    } else {
      return [...deck];
    }
  }

}
