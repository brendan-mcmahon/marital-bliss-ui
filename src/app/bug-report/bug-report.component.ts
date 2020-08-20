import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-bug-report',
  templateUrl: './bug-report.component.html',
  styleUrls: ['./bug-report.component.scss']
})
export class BugReportComponent implements OnInit {

  bugReport: string;
  bsModalRef: BsModalRef;

  constructor(private apiService: ApiService,
    private modalService: BsModalService) { }

  ngOnInit() {
  }

  submit() {
    this.apiService.submitBugReport(this.bugReport)
      .subscribe(res => {
        this.bugReport = '';
        this.openModal()
      });
  }

  openModal() {
    const initialState = {
      text: 'Thanks! Your bug has been logged.'
    };
    this.bsModalRef = this.modalService.show(AlertComponent, {initialState});
    this.bsModalRef.content.closeTrigger.subscribe((value: any) => {
      this.bsModalRef.hide();
    });
  }


}
