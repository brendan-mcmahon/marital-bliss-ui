import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Notification } from '../models/notification';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditNotificationComponent } from './notification/notification.component';
import { faInfoCircle, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { GesturesService } from '../services/gestures.service';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  @Output() closeMenuTrigger = new EventEmitter<any>();

  notifications: Notification[] = [];
  bsModalRef: BsModalRef;

  infoIcon = faInfoCircle;
  rejectIcon = faTimes;
  acceptIcon = faCheck;


  constructor(private matchService: MatchService,
              private modalService: BsModalService,
              private router: Router,
              private gestureService: GesturesService) { }

  ngOnInit() {
    this.matchService.notification$.subscribe (n => this.notifications = this.sort(n));
    this.gestureService.refresh$.subscribe(_ => {
      this.matchService.notification$.refresh();
    });

    this.matchService.notification$.refresh();
  }

  sort(notifications: Notification[]) {
    const compare = (a: Notification, b: Notification) => {
      if (a.createdOn < b.createdOn) { return 1; }
      if (a.createdOn > b.createdOn) { return -1; }
      return 0;
    }

    return [...notifications.sort(compare)];
  }

  getIcon(notification: Notification) {
    if (notification.status === 'accepted') { return this.acceptIcon; }
    if (notification.status === 'rejected') { return this.rejectIcon; }
    return this.infoIcon;
  }

  openNotification(notification: Notification) {
    const initialState = {
      notification
    };
    this.bsModalRef = this.modalService.show(EditNotificationComponent, {initialState});
    this.bsModalRef.content.closeTrigger.subscribe((value: any) => {
      this.bsModalRef.hide();
    });

    this.bsModalRef.content.responseTrigger.subscribe((response: { notification: Notification, response: any }) => {
      this.matchService.notification$.next([...this.notifications.filter(n => n.id !== response.notification.id)]);

      this.processNotification(response.notification);

      this.bsModalRef.hide();
    });
  }

  processNotification(n: Notification) {
    console.log(`Processing notification: ${JSON.stringify(n)}`);
    if (n.entityType === 'game' && n.action === 'end' && n.status === 'accepted'){
      this.endGame();
    }

    if (n.entityType === 'mission' && n.status === 'accepted') {
      this.matchService.missionDeck$.refresh();
    }

    if (n.entityType === 'reward' && n.status === 'accepted') {
      this.matchService.rewardDeck$.refresh();
    }
  }

  endGame() {
    console.log('emitting close menu trigger');
    this.closeMenuTrigger.emit();
    this.router.navigate(['EndGame']);
  }

}
