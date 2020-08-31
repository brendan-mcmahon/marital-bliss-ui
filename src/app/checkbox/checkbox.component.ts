import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  check = faCheck;
  checked = false; // this should be input somehow...
  @Input() label: string;
  @Output() onCheck = new EventEmitter<boolean>();

  constructor() { }

  toggleCheck() {
    this.checked = !this.checked;
    this.onCheck.emit(this.checked)
  }

  ngOnInit() {
  }

}
