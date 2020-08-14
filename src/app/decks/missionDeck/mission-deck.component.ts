import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service';
import { Card } from '../../models/card';
import { MatchService } from '../../match.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MissionCardComponent } from '../../game/mission-card/mission-card.component';
import { AlertComponent } from '../../alert/alert.component';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mission-deck',
  templateUrl: './mission-deck.component.html',
  styleUrls: ['../decks.component.scss', './mission-deck.component.scss']
})
export class MissionDeckComponent implements OnInit {

  modalRef: BsModalRef;
  chevronDown = faChevronDown;
  chevronUp = faChevronUp;

  showDeck = false;
  public deck: Card[];
  public deckDisplay: Card[];
  selectedMission: Card;
  filterText = '';
  showRemoved = false;

  constructor(
    private apiService: ApiService,
    public matchService: MatchService,
    private modalService: BsModalService) {
   }

   ngOnInit() {
    this.apiService.getMissionDeck(this.matchService.getMatch().id)
    .subscribe(d => {
        this.deck = d;
        this.deckDisplay = [...this.deck.filter(md => md.status === 'enabled')];
    });
  }

  filterDisplay() {
    if (this.showRemoved) {
      this.deckDisplay = this.filter(this.deck);
    } else {
      this.deckDisplay = this.filter(this.deck.filter(md => md.status === 'enabled'));
    }
  }

  toggleShowRemoved(){
    this.showRemoved = !this.showRemoved;
    this.filterDisplay();
  }

   missionSelected(mission: Card) {
    this.selectedMission = mission;
    const initialState = {
        card: mission,
        buttonPhase: 'edit'
      };
    this.modalRef = this.modalService.show(MissionCardComponent, {initialState});
    this.modalRef.content.cardStatusUpdated.subscribe((_: any) => {
      this.modalRef.hide();
      this.alert('A message has been sent to your opponent to approve this change.');
    });
    this.modalRef.content.closeBtnName = 'Close';
  }

  private alert(text: string) {
    this.modalRef = this.modalService.show(AlertComponent, { initialState: { text } });
    this.modalRef.content.closeTrigger.subscribe((_: any) => {
      this.modalRef.hide();
    });
  }

  filter(deck: Card[]) {
    if (this.filterText !== '') {
      return deck.filter(mission => {
        return  mission.title.match(new RegExp(this.filterText, 'i'))
          || mission.description.match(new RegExp(this.filterText, 'i'))
      });
    } else {
      return [...deck];
    }
  }

}
