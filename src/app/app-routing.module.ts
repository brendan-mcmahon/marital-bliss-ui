import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { RewardsComponent } from './rewards/rewards.component';
import { LandingComponent } from './landing/landing.component';
import { EndgameComponent } from './game/endgame/endgame.component';
import { GuessMissionComponent } from './game/guess-mission/guess-mission.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'Home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'Game', component: GameComponent, canActivate: [AuthGuardService] },
  { path: 'NewGame', component: GameComponent, canActivate: [AuthGuardService] },
  { path: 'Rewards', component: RewardsComponent, canActivate: [AuthGuardService] },
  { path: 'EndGame', component: EndgameComponent, canActivate: [AuthGuardService] },
  { path: 'Guess', component: GuessMissionComponent, canActivate: [AuthGuardService]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
