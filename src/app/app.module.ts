import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchesComponent } from './matches/matches.component';
import { GameComponent } from './game/game.component';
import { RewardsComponent } from './rewards/rewards.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './landing/login/login.component';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './landing/register/register.component';
import { AuthInterceptor } from './services/auth/auth-interceptor';
import { MissionCardComponent } from './game/mission-card/mission-card.component';
import { RewardCardComponent } from './game/reward-card/reward-card.component';
import { EndgameComponent } from './game/endgame/endgame.component';
import { GuessMissionComponent } from './game/guess-mission/guess-mission.component';
import { CountdownComponent } from './game/countdown/countdown.component';
import { FooterComponent } from './footer/footer.component';
import { AccountComponent } from './account/account.component';
import { EndGameSummaryComponent } from './game/endgame/end-game-summary/end-game-summary.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GuessResultComponent } from './game/guess-mission/guess-result/guess-result.component';
import { MissionDeckComponent } from './decks/missionDeck/mission-deck.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { EditNotificationComponent } from './notifications/notification/notification.component';
import { AlertComponent } from './alert/alert.component';
import { DecksComponent } from './decks/decks.component';
import { RewardDeckComponent } from './decks/reward-deck/reward-deck.component';
import { UrlSerializer } from '@angular/router';
import { LowerCaseUrlSerializer } from './lower-case-url-serializer';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MenuComponent } from './menu/menu.component';
import { RewardListComponent } from './rewards/reward-list/reward-list.component';
import { BugReportComponent } from './bug-report/bug-report.component';
import { LoadingComponent } from './loading/loading.component';
import { EditMissionComponent } from './game/mission-card/edit-mission/edit-mission.component';
import { EditRewardComponent } from './game/reward-card/edit-reward/edit-reward.component';
import { EndgameAlertComponent } from './game/endgame/endgame-alert/endgame-alert.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FireworksComponent } from './fireworks/fireworks.component';
import { ForgotPasswordComponent } from './landing/forgot-password/forgot-password.component';
import { FocusDirective } from './focus.directive';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { direction: Hammer.DIRECTION_ALL },
  } as any;
}

@NgModule({
  declarations: [
    AppComponent,
    MatchesComponent,
    GameComponent,
    RewardsComponent,
    LoginComponent,
    LandingComponent,
    RegisterComponent,
    MissionCardComponent,
    RewardCardComponent,
    EndgameComponent,
    GuessMissionComponent,
    CountdownComponent,
    FooterComponent,
    AccountComponent,
    EndGameSummaryComponent,
    GuessResultComponent,
    MissionDeckComponent,
    NotificationsComponent,
    EditNotificationComponent,
    AlertComponent,
    DecksComponent,
    RewardDeckComponent,
    PageNotFoundComponent,
    MenuComponent,
    RewardListComponent,
    BugReportComponent,
    LoadingComponent,
    EditMissionComponent,
    EditRewardComponent,
    EndgameAlertComponent,
    CheckboxComponent,
    FireworksComponent,
    ForgotPasswordComponent,
    FocusDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ModalModule.forRoot()
  ],
  providers: [
    // {
    //   provide: UrlSerializer,
    //   useClass: LowerCaseUrlSerializer
    // },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    }
  ],
  entryComponents: [
    MissionCardComponent,
    RewardCardComponent,
    GuessResultComponent,
    EditNotificationComponent,
    EditMissionComponent,
    EditRewardComponent,
    EndgameAlertComponent,
    AlertComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
