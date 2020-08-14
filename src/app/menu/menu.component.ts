import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { faBars, faTimes, faChevronDown, faChevronUp, faChevronRight, faUsers, faUser, faBell, faBug } from '@fortawesome/free-solid-svg-icons';
import { MatchService } from '../match.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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

  hasMatch = false;
  showMenu = false;
  showMatches = false;
  showAccount = false;
  showBugReport = false;

  constructor(public matchService: MatchService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.matchService.matchUpdate$.subscribe(u => {
      this.hasMatch = this.matchService.getMatch() !== null;
      console.log('match updated');
  });
    this.matchService.pokeMatch();
}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  getMenuWidth() {
    return this.showMenu ? '100%' : '0';
  }

  toggleShowMatches() {
    this.showMatches = !this.showMatches;
  }

  toggleShowAccount() {
    this.showAccount = !this.showAccount;
  }

  toggleShowBugReport() {
    this.showBugReport = !this.showBugReport;
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
