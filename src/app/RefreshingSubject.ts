import { BehaviorSubject, Observable, Subscription } from 'rxjs';
export class RefreshingSubject<T> extends BehaviorSubject<T> {
  refresher: () => Observable<T>;
  refreshOn: (x: T) => boolean;

  constructor(value: T, refresher: (() => Observable<T>), refreshOn: ((x: T) => boolean) = null) {
    super(value);
    this.refresher = refresher;
    this.refreshOn = refreshOn || ((x) => x === null);
  }

  refresh() {
    console.log('refreshing');
    this.refresher().subscribe((r: T) => this.next(r));
  }

  refreshAndSubscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    if (this.refreshOn(this.getValue())) {
      this.refresh();
    }
    return super.subscribe(next, error, complete);
  }
}
