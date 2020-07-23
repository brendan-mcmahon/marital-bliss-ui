import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { UserRegistration } from 'src/app/user-registration';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancel = new EventEmitter<any>();

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

  emitCancel(){
    this.cancel.emit();
  }

}
