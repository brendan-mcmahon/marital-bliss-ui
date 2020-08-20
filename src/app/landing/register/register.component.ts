import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserRegistration } from 'src/app/models/user-registration';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../landing.component.scss', './register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancel = new EventEmitter<any>();

  constructor(private authService: AuthService, private apiService: ApiService, private router: Router) { }

  model = new UserRegistration();

  register() {
    this.authService.register(this.model)
    .subscribe(result => {
      this.apiService.getUser().subscribe(user => {
        this.authService.loggedInUser$.next(user);
        this.router.navigate(['Game']);
      });
    });
  }

  ngOnInit() {
  }

  emitCancel(){
    this.cancel.emit();
  }

}
