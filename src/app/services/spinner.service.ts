import { Injectable, Output, EventEmitter, Directive } from '@angular/core';

@Directive()
@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  @Output() showSpinner = new EventEmitter();
  @Output() hideSpinner = new EventEmitter();
  constructor() { }

  show() {
    this.showSpinner.next(true);
  }

  hide() {
    this.showSpinner.next(false);
  }
}
