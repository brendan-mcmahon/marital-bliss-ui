import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatchService } from '../services/match.service';
import { ApiService } from '../services/api.service';
import { Player } from '../models/player';
import { faTimes, faCheck, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  close = faTimes;
  check = faCheck;
  pencil = faPencilAlt;

  editFirstName = false;
  editLastName = false;
  editEmail = false;

  @ViewChild('firstNameInput', { static: false }) firstNameInput: ElementRef;
  @ViewChild('lastNameInput', { static: false }) lastNameInput: ElementRef;
  @ViewChild('emailInput', { static: false }) emailInput: ElementRef;

  player: Player;

  constructor(
    public matchService: MatchService,
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.apiService.getUser()
      .subscribe(user => {
        this.player = user;
        if (this.matchService.getMatch()) {
          this.matchService.match.player = user;
        }
        console.log(JSON.stringify(user))});
  }

  toggleEdit(field: string) {
    // this.changeDetectorRef.detectChanges();
    // console.log(this.firstNameInput);
    if (field === 'firstName') {
      this.editFirstName = !this.editFirstName;
      // if (this.editFirstName) { this.firstNameInput.nativeElement.focus(); }
    }
    if (field === 'lastName') {
      this.editLastName = !this.editLastName;
      // if (this.editLastName) { this.lastNameInput.nativeElement.focus(); }
    }
    if (field === 'email') {
      this.editEmail = !this.editEmail;
      // if (this.editEmail) { this.emailInput.nativeElement.focus(); }
    }
  }

  saveEdit(field: string) {
    this.apiService.updateUserAccount(this.player)
      .subscribe(p => {
        this.authService.loggedInUser$.next(p);
        this.player = p;
        this.toggleEdit(field);
      })
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
