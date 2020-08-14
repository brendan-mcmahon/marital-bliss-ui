import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatchService } from '../match.service';
import { ApiService } from '../api.service';
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

  player: Player;

  constructor(
    public matchService: MatchService,
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getUser()
      .subscribe(user => {
        this.player = user;
        if (this.matchService.getMatch()) {
          this.matchService.match.player = user;
        }
        console.log(JSON.stringify(user))});
    // this.player = this.matchService.getPlayer();
  }

  toggleEdit(field: string) {
    if (field === 'firstName') { this.editFirstName = !this.editFirstName; }
    if (field === 'lastName') { this.editLastName = !this.editLastName; }
    if (field === 'email') { this.editEmail = !this.editEmail; }
  }

  saveEdit(field: string) {
    this.apiService.updateUserAccount(this.player)
      .subscribe(p => {
        this.authService.loggedInUser$.next(p);
        this.player = p;
        // this.player = this.matchService.getPlayer();
        this.toggleEdit(field);
      })
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
