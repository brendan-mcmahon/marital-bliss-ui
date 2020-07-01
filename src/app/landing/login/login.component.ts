import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { UserLogin } from 'src/app/user-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  model = new UserLogin();

  login() {
    this.authService.login(this.model)
    .subscribe(result => {
      this.router.navigate(['Home']);
    });
  }


  ngOnInit() {
  }

}
