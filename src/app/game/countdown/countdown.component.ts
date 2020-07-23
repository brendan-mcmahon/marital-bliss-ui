import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  constructor() { }

  @Input() from: Date;
  public counter: number;
  public clock: Clock = new Clock();

  ngOnInit() {
    this.counter = this.getTimeRemaining();
    this.clock.set(this.counter);

    const intervalId = setInterval(() => {
      this.counter = this.counter - 1000;
      this.clock.set(this.counter);
      if (this.counter === 0) { clearInterval(intervalId); }
  }, 1000);

  }

  getTimeRemaining(): number {
    return new Date(this.from).getTime() - new Date().getTime();
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
