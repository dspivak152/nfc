import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DeviceService } from '../services/index';
import { ArraySimpleInterface } from '../interfaces/index';
import { MessageNfcModel, RoomAvailable } from '../models/index';
import { WindowRef } from '../WindowRef';
import { MatStepper } from '@angular/material';
import { SpinnerService } from '../services/spinner.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register-tray',
  templateUrl: './register-tray.component.html',
  styleUrls: ['./register-tray.component.scss']
})
export class RegisterTrayComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  //secondFormGroup: FormGroup;
  //thiredFormGroup: FormGroup;
  hotels: ArraySimpleInterface[] = [];
  cities: string[] = [];
  counties: any[] = [];
  messageNfcModel = new MessageNfcModel();
  roomAvailable: RoomAvailable;

  constructor(private deviceService: DeviceService,
    private _formBuilder: FormBuilder,
    private winRef: WindowRef,
    private spinnerService: SpinnerService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {

    this.firstFormGroup = new FormGroup({
      firstCtrl: new FormControl(),
      emailCtrl: new FormControl(),
      countryCtrl: new FormControl(),
      cityCtrl: new FormControl(),
      hotelCtrl: new FormControl(),
      roomId: new FormControl(),
      lightSensitivity: new FormControl(),
      wifiNameCtrl: new FormControl(),
      wifiPasswordCtrl: new FormControl()
    });

    // this.secondFormGroup = new FormGroup({
    //   countryCtrl: new FormControl(),
    //   cityCtrl: new FormControl(),
    //   hotelCtrl: new FormControl(),
    //   roomId: new FormControl(),
    //   lightSensitivity: new FormControl()
    // });

    // this.thiredFormGroup = new FormGroup({
    //   wifiNameCtrl: new FormControl(),
    //   wifiPasswordCtrl: new FormControl()
    // });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.required],
      countryCtrl: ['', Validators.required],
      cityCtrl: ['', Validators.required],
      hotelCtrl: ['', Validators.required],
      roomId: ['', Validators.required],
      lightSensitivity: ['', [Validators.required, Validators.max(1023), Validators.min(0)]],
      wifiNameCtrl: ['', Validators.required],
      wifiPasswordCtrl: ['', Validators.required]
    });
    // this.secondFormGroup = this._formBuilder.group({
    //   countryCtrl: ['', Validators.required],
    //   cityCtrl: ['', Validators.required],
    //   hotelCtrl: ['', Validators.required],
    //   roomId: ['', Validators.required],
    //   lightSensitivity: ['', [Validators.required, Validators.max(1023), Validators.min(0)]]
    // });
    // this.thiredFormGroup = this._formBuilder.group({
    //   wifiNameCtrl: ['', Validators.required],
    //   wifiPasswordCtrl: ['', Validators.required]
    // });
    this.deviceService.getCountries().subscribe(counties => {
      this.counties = counties;
    });
  }

  sendMessageToNfc() {
    if (this.messageNfcModel.lightSensitivity < 0 || this.messageNfcModel.lightSensitivity > 1023) {
      this.snackBar.open("Please enter a valid number for the light sensitivity", '', { duration: 2000 });
      return false;
    }
    this.roomAvailable = new RoomAvailable(this.messageNfcModel.roomId, this.messageNfcModel.name,
      this.messageNfcModel.email, this.messageNfcModel.hotelId);
    this.spinnerService.show();
    this.deviceService.checkRoomAvailabilty(this.roomAvailable).subscribe(result => {
      this.spinnerService.hide();
      if (result && result.isCreated) {
        this.winRef.nativeWindow.foo(this.messageNfcModel);
      } else {
        //stepper.previous();
        this.snackBar.open("Error creating new room", '', { duration: 2000 });
        return false;
      }
    });
  }

  onCountryChange(countryId: number) {
    if (countryId > 0) {
      this.spinnerService.show();
      this.deviceService.getCities(countryId).subscribe(cities => {
        this.cities = cities;
        this.spinnerService.hide();
      });
    }
  }

  onCityChange(cityId: number) {
    if (cityId > 0) {
      this.spinnerService.show();
      this.deviceService.getHotels().subscribe(hotels => {
        this.hotels = hotels;
        this.spinnerService.hide();
      });
    }
  }

  goForward(stepper: MatStepper) {
    //check for the room availablity as
    //if (stepper.selectedIndex == 1) {
    if (this.messageNfcModel.lightSensitivity < 0 || this.messageNfcModel.lightSensitivity > 1023) {
      this.snackBar.open("Please enter a valid number for the light sensitivity", '', { duration: 2000 });
      return false;
    }
    this.roomAvailable = new RoomAvailable(this.messageNfcModel.roomId, this.messageNfcModel.name,
      this.messageNfcModel.email, this.messageNfcModel.hotelId);
    this.spinnerService.show();
    this.deviceService.checkRoomAvailabilty(this.roomAvailable).subscribe(result => {
      this.spinnerService.hide();
      if (result && result.isCreated) {
        //continue to next step
        //stepper.next();
      } else {
        //stepper.previous();
        this.snackBar.open("Error creating new room", '', { duration: 2000 });
        return false;
      }
    });
    //}
    //stepper.next();
  }
}
