import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Notification } from '../models/notification';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditNotificationComponent } from './notification/notification.component';
import { faInfoCircle, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[] = [];
  bsModalRef: BsModalRef;

  infoIcon = faInfoCircle;
  rejectIcon = faTimes;
  acceptIcon = faCheck;


  constructor(private apiService: ApiService,
              private modalService: BsModalService) { }

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
    this.bsModalRef.content.responseTrigger.subscribe((notificationId: number) => {
      this.notifications = [...this.notifications.filter(n => n.id !== notificationId)];
      this.bsModalRef.hide();
    });
  }

}
