import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-guess-result',
  templateUrl: './guess-result.component.html',
  styleUrls: ['./guess-result.component.scss']
})
export class GuessResultComponent implements OnInit {

  @Input() opponentName: string;
  @Input() missionTitle: string;
  @Input() correct: boolean;
  @Output() closeTrigger = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  close(){
    this.closeTrigger.emit();
  }

}
