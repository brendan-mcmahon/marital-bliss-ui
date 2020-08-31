import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() text: string;
  @Input() buttonText: string;
  @Output() closeTrigger = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.closeTrigger.emit();
  }

}
