import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchesComponent } from './matches/matches.component';
import { GameComponent } from './game/game.component';
import { RewardsComponent } from './rewards/rewards.component';
import { LandingComponent } from './landing/landing.component';
import { EndgameComponent } from './game/endgame/endgame.component';
import { GuessMissionComponent } from './game/guess-mission/guess-mission.component';
import { AuthGuardService } from './auth-guard.service';
import { AccountComponent } from './account/account.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DecksComponent } from './decks/decks.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'Matches', component: MatchesComponent, canActivate: [AuthGuardService] },
  { path: 'Game', component: GameComponent, canActivate: [AuthGuardService] },
  { path: 'NewGame', component: GameComponent, canActivate: [AuthGuardService] },
  { path: 'Rewards', component: RewardsComponent, canActivate: [AuthGuardService] },
  { path: 'EndGame', component: EndgameComponent, canActivate: [AuthGuardService] },
  { path: 'Guess', component: GuessMissionComponent, canActivate: [AuthGuardService] },
  { path: 'Account', component: AccountComponent, canActivate: [AuthGuardService] },
  { path: 'Deck', component: DecksComponent, canActivate: [AuthGuardService] },
  { path: 'Notifications', component: NotificationsComponent, canActivate: [AuthGuardService] },
  { path: 'Menu', component: MenuComponent, canActivate: [AuthGuardService] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
