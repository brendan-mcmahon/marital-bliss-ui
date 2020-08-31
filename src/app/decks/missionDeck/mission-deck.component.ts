import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Card } from '../../models/card';
import { MatchService } from '../../services/match.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MissionCardComponent } from '../../game/mission-card/mission-card.component';
import { AlertComponent } from '../../alert/alert.component';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { GesturesService } from 'src/app/services/gestures.service';
import { EditMissionComponent } from 'src/app/game/mission-card/edit-mission/edit-mission.component';

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
    private modalService: BsModalService,
    private gestureService: GesturesService) {
  }

  ngOnInit() {
    // can gesture service call a refresh method on the RefreshingSubject?
    // this.gestureService.refresh$.subscribe(_ => this.getData());
    this.matchService.missionDeck$.refreshAndSubscribe(md => {
      if (md) {
        this.filterText = '';
        this.deck = md;
        this.deckDisplay = this.sortMissions([...this.deck.filter(mission => mission.status === 'enabled')]);
      }
    });
  }

  sortMissions(array: Card[]) {
    const compare = (a: Card, b: Card) => {
      if (a.title < b.title) { return -1; }
      if (a.title > b.title) { return 1; }
      return 0;
    };

    return [...array.sort(compare)];
  }

  filterDisplay() {
    if (this.showRemoved) {
      this.deckDisplay = this.sortMissions(this.filter(this.deck));
    } else {
      this.deckDisplay = this.sortMissions(this.filter(this.deck.filter(md => md.status === 'enabled')));
    }
  }

  createNew() {
    this.modalRef = this.modalService.show(EditMissionComponent);
    this.modalRef.content.cardUpdated.subscribe((_: any) => {
      this.modalRef.hide();
      this.alert('A message has been sent to your opponent to approve your new mission!');
    });
    this.modalRef.content.closeBtnName = 'Close';
  }

  toggleShowRemoved() {
    this.showRemoved = !this.showRemoved;
    this.filterDisplay();
  }

  missionSelected(mission: Card) {
    this.selectedMission = mission;
    const initialState = {
      card: mission,
      buttonPhase: 'edit'
    };
    this.modalRef = this.modalService.show(MissionCardComponent, { initialState });
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
        return mission.title.match(new RegExp(this.filterText, 'i'))
          || mission.description.match(new RegExp(this.filterText, 'i'))
      });
    } else {
      return [...deck];
    }
  }

}
