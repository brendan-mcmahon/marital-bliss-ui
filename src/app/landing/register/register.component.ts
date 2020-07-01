import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { UserRegistration } from 'src/app/user-registration';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  model = new UserRegistration();

  register() {
    this.authService.register(this.model)
    .subscribe(result => {
      console.log(result);
    });
  }

  ngOnInit() {
  }

}
