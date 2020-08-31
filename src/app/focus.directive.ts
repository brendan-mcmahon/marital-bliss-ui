import { Directive, AfterContentInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements AfterContentInit {

  constructor(private el: ElementRef) { }

  ngAfterContentInit(): void {
    this.el.nativeElement.focus();
    // setTimeout(() => {
    //   this.el.nativeElement.focus();
    // }, 250);
  }

}
