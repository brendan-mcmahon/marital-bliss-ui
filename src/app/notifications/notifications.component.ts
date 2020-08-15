import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { Notification } from '../models/notification';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditNotificationComponent } from './notification/notification.component';
import { faInfoCircle, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

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


  constructor(private apiService: ApiService,
              private modalService: BsModalService,
              private router: Router) { }

  ngOnInit() {
    this.apiService.getNotifications()
      .subscribe(n => {
        this.notifications = n;
      });
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

    // would be cool to take a function on response trigger to perform whatever action makes sense next
    // (eg. end game redirect to game page)
    this.bsModalRef.content.responseTrigger.subscribe((response: { notification: Notification, response: any }) => {
      this.notifications = [...this.notifications.filter(n => n.id !== response.notification.id)];

      console.log(`processing notification: ${JSON.stringify(response.notification)}`);
      this.processNotification(response.notification);

      this.bsModalRef.hide();
    });
  }

  processNotification(n: Notification) {
    if (n.entityType === 'game' && n.action === 'end' && n.status === 'accepted'){
      this.endGame();
    }
  }

  endGame() {
    console.log('emitting close menu trigger');
    this.closeMenuTrigger.emit();
    this.router.navigate(['EndGame']);
  }

}
