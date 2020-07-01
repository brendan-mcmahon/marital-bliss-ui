import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { PrizesComponent } from './prizes/prizes.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './landing/login/login.component';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './landing/register/register.component';
import { AuthInterceptor } from './auth-interceptor';
import { MissionCardComponent } from './game/mission-card/mission-card.component';
import { RewardCardComponent } from './game/reward-card/reward-card.component';
import { EndgameComponent } from './game/endgame/endgame.component';
import { GuessMissionComponent } from './game/guess-mission/guess-mission.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    PrizesComponent,
    LoginComponent,
    LandingComponent,
    RegisterComponent,
    MissionCardComponent,
    RewardCardComponent,
    EndgameComponent,
    GuessMissionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
