import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { MatchService } from './match.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'marital-bliss-ui';

  showBugReportInput = false;
  bugReport: string;
  showMenuButton = true;

  constructor(
    private matchService: MatchService,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router){}

  ngOnInit(): void {
    console.log(this.authService.isLoggedIn());
    // this.showMenuButton = this.authService.isLoggedIn();
  }

  submitBugReport() {
    this.apiService.submitBugReport(this.bugReport)
      .subscribe(r => {
        console.log(JSON.stringify(r));
        this.showBugReportInput = false;
        this.bugReport = '';
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
