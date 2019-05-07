import { Component, OnInit, Input } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  @Input() loading;

  constructor(private spinnerService: SpinnerService) {
    spinnerService.showSpinner.subscribe(result => {
      this.show(result);
    });

    spinnerService.hideSpinner.subscribe(result => {
      this.hide(result);
    });
  }

  ngOnInit() {
  }


  show(result) {
    this.loading = result;
  }

  hide(result) {
    this.loading = result
  }

}