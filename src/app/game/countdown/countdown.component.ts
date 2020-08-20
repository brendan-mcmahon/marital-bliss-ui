import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  constructor(private apiService: ApiService, private matchService: MatchService) { }

  @Input() from: Date;
  @Output() endGameTrigger = new EventEmitter<any>();
  public counter: number;
  public clock: Clock = new Clock();
  enableEndGameButton = false;

  ngOnInit() {
    this.counter = this.getTimeRemaining();
    this.clock.set(this.counter);

    const intervalId = setInterval(() => {
      this.counter = this.counter - 1000;
      this.clock.set(this.counter);
      if (this.counter === 0) { clearInterval(intervalId); }
  }, 1000);

    this.apiService.getEndGameNotification(this.matchService.getGame().id)
      .subscribe(n => {
        if (n) {
          this.enableEndGameButton = false;
        } else {
          this.enableEndGameButton = true;
        }
      });
  }

  getTimeRemaining(): number {
    return new Date(this.from).getTime() - new Date().getTime();
  }

  endGame() {
    this.enableEndGameButton = false;
    this.endGameTrigger.emit();
  }

}

export class Clock {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  set(milliseconds: number) {
    let totalSeconds = milliseconds / 1000;

    this.days = Math.floor(totalSeconds / (24 * 60 * 60));
    totalSeconds = totalSeconds % (24 * 60 * 60);
    this.hours = Math.floor(totalSeconds / (60 * 60));
    totalSeconds = totalSeconds % (60 * 60);
    this.minutes = Math.floor(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;
    this.seconds = Math.floor(totalSeconds);
  }
}
