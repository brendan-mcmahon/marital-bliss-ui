import { Component, OnInit } from '@angular/core';
import { MatchService } from '../match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss']
})
export class DecksComponent implements OnInit {

  constructor(public matchService: MatchService, private router: Router) { }

  ngOnInit() {

    if (this.matchService.getMatch() === null) {
      this.router.navigate(['Matches']);
    }

  }

}
