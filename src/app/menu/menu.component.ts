import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { faBars, faTimes, faChevronDown, faChevronUp, faChevronRight, faUsers, faUser, faBell, faBug, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { MatchService } from '../services/match.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  hamburger = faBars;
  close = faTimes;
  chevronDown = faChevronDown;
  chevronUp = faChevronUp;
  chevronRight = faChevronRight;
  people = faUsers;
  person = faUser;
  bell = faBell;
  bug = faBug;
  question = faQuestion;
  notificationCount: number;
  playerName: string;

  hasMatch = false;
  showHowToPlay = false;
  showMenu = false;
  showMatches = false;
  showAccount = false;
  showNotifications = false;
  showBugReport = false;

  constructor(public matchService: MatchService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.matchService.player$.subscribe(p => { if (p) { this.playerName = p.firstName; }});
    this.matchService.match$.refreshAndSubscribe(m => {
      this.hasMatch = !!m;
      // this.hasMatch = this.matchService.getMatch() !== null;
      console.log('match updated');
    });
    this.matchService.pokeMatch();
    this.matchService.notification$.refreshAndSubscribe(n => {
      this.notificationCount = n ? n.length : null;
    });
    this.matchService.notification$.refresh();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  getMenuWidth() {
    return this.showMenu ? '100%' : '0';
  }

  toggleAllFalse() {
    this.showMatches = false;
    this.showAccount = false;
    this.showNotifications = false;
    this.showBugReport = false;
    this.showHowToPlay = false;
  }

  toggleShowHowToPlay() {
    this.showHowToPlay = !this.showHowToPlay;
    this.showMatches = false;
    this.showAccount = false;
    this.showNotifications = false;
    this.showBugReport = false;

  }

  toggleShowMatches() {
    this.showMatches = !this.showMatches;
    this.showAccount = false;
    this.showNotifications = false;
    this.showBugReport = false;
    this.showHowToPlay = false;
  }

  toggleShowNotifications() {
    this.showNotifications = !this.showNotifications;
    this.showMatches = false;
    this.showAccount = false;
    this.showBugReport = false;
    this.showHowToPlay = false;
  }

  toggleShowAccount() {
    this.showAccount = !this.showAccount;
    this.showMatches = false;
    this.showNotifications = false;
    this.showBugReport = false;
    this.showHowToPlay = false;
  }

  toggleShowBugReport() {
    this.showBugReport = !this.showBugReport;
    this.showMatches = false;
    this.showAccount = false;
    this.showNotifications = false;
    this.showHowToPlay = false;
  }

  navigateTo(route: string) {
    this.showMenu = false;
    this.router.navigate([route]);
  }

  logout() {
    this.showMenu = false;
    this.authService.logout();
    this.router.navigate(['']);
  }
}
