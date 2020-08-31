import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PasswordResetRequest } from 'src/app/models/passwordResetRequest';
import { AlertComponent } from 'src/app/alert/alert.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../landing.component.scss', './forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {

  @Output() cancel = new EventEmitter<string>();
  loading = false;
  errorMessage: string;
  emailInput = true;
  codeInput = false;
  email: string;
  request: PasswordResetRequest = new PasswordResetRequest();
  bsModalRef: BsModalRef;

  constructor(private apiService: ApiService,
              private modalService: BsModalService) { }

  ngOnInit() {
  }

  requestReset() {
    this.loading = true;
    this.apiService.submitPasswordResetRequest(this.email)
      .subscribe(r => {
        this.loading = false;
        this.emailInput = false;
        this.codeInput = true;
      });
  }

  submitRequest() {
    this.apiService.submitNewPassword(this.email, this.request.code, this.request.password, this.request.passwordConfirmation)
      .subscribe(r => {
        console.log(r);
        // redirect to log in, alert that the password has been updated
        this.openNotification();
      });
  }

  emitCancel() {
    this.cancel.emit('login');
  }


  openNotification() {
    const initialState = {
      text: 'Your password has been updated. Return to the login screen to try it out!',
      buttonText: 'Back to Login'
    };
    this.bsModalRef = this.modalService.show(AlertComponent, {initialState});
    this.bsModalRef.content.closeTrigger.subscribe((value: any) => {
      this.bsModalRef.hide();
    });

    this.bsModalRef.content.closeTrigger.subscribe(() => {
      this.cancel.emit('login');
      this.bsModalRef.hide();
    });
  }
}


