import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GesturesService {

  refresh$ = new Subject<any>();

  refreshPage() {
    this.refresh$.next();
  }

  constructor() { }
}
