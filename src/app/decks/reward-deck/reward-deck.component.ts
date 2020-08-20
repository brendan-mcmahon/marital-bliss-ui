import { Component, OnInit, } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatchService } from '../../services/match.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertComponent } from '../../alert/alert.component';
import { Reward } from 'src/app/models/reward';
import { RewardCardComponent } from 'src/app/game/reward-card/reward-card.component';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { EditRewardComponent } from 'src/app/game/reward-card/edit-reward/edit-reward.component';
import { GesturesService } from 'src/app/services/gestures.service';

@Component({
  selector: 'app-reward-deck',
  templateUrl: './reward-deck.component.html',
  styleUrls: ['../decks.component.scss', './reward-deck.component.scss',]
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
    private modalService: BsModalService,
    private gestureService: GesturesService) {
  }

  ngOnInit() {
    // can gesture service call a refresh method on the RefreshingSubject?
    // this.gestureService.refresh$.subscribe(_ => this.getData());
    this.matchService.rewardDeck$.refreshAndSubscribe(rd => {
      if (rd) {
        this.filterText = '';
        this.deck = rd;
        this.deckDisplay = this.sortRewards([...this.deck.filter(reward => reward.status === 'enabled')]);
      }
    });
  }

  // ngOnInit() {
  //   this.gestureService.refresh$.subscribe(_ => this.getData());
  //   this.getData();
  // }

  private getData() {
    this.filterText = '';
    this.apiService.getRewardDeck(this.matchService.getMatch().id)
      .subscribe(d => {
        this.deck = d;
        this.deckDisplay = this.sortRewards([...this.deck.filter(md => md.status === 'enabled')]);
      });
  }


  sortRewards(array: Reward[]) {
    const compare = (a: Reward, b: Reward) => {
      if (a.title < b.title) { return -1; }
      if (a.title > b.title) { return 1; }
      return 0;
    };

    return [...array.sort(compare)];
  }

  filterDisplay() {
    if (this.showRemoved) {
      this.deckDisplay = this.sortRewards(this.filter(this.deck));
    } else {
      this.deckDisplay = this.sortRewards(this.filter(this.deck.filter(md => md.status === 'enabled')));
    }
  }

  createNew() {
    this.modalRef = this.modalService.show(EditRewardComponent);
    this.modalRef.content.cardUpdated.subscribe((_: any) => {
      this.modalRef.hide();
      this.alert('A message has been sent to your opponent to approve your new reward!');
    });
    this.modalRef.content.closeBtnName = 'Close';
  }

  toggleShowRemoved() {
    this.showRemoved = !this.showRemoved;
    this.filterDisplay();
  }

  rewardSelected(reward: Reward) {
    this.selectedReward = reward;
    const initialState = {
      reward,
      buttonPhase: 'edit'
    };
    this.modalRef = this.modalService.show(RewardCardComponent, { initialState });
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
        return reward.title.match(new RegExp(this.filterText, 'i'))
          || reward.description.match(new RegExp(this.filterText, 'i'))
      });
    } else {
      return [...deck];
    }
  }

}
