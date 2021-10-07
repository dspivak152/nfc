import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-nfc-data',
  templateUrl: './snackbar-nfc-data.component.html',
  styleUrls: ['./snackbar-nfc-data.component.css']
})
export class SnackbarNfcDataComponent {
  dataFromNcf: any;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
    private _snackRef: MatSnackBarRef<SnackbarNfcDataComponent>) {
    this.dataFromNcf = data;
  }

  dismiss() {
    this._snackRef.dismiss();
  }
}
