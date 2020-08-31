import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  displayFooter = true;
  activeRoute: string;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(e => {
      this.activeRoute = this.router.url.substring(1);
    });
   }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.displayFooter = loggedIn;
      console.log(`logged in update: ${loggedIn}`);
    });
    this.activeRoute = this.router.url.substring(1);
  }

  navigateTo(path: string) {
    this.activeRoute = path;
    this.router.navigate([path]);
  }

}
