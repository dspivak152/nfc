import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DeviceService, AuthService } from '../services/index';
import { ArraySimpleInterface } from '../interfaces/index';
import { MessageNfcModel, RoomAvailable } from '../models/index';
import { WindowRef } from '../WindowRef';
import { SpinnerService } from '../services/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { validateNumberPositive } from '../utils/utilityFunctions';
import { SnackbarNfcDataComponent } from '../snackbar-nfc-data/snackbar-nfc-data.component';
@Component({
  selector: 'app-register-tray',
  templateUrl: './register-tray.component.html',
  styleUrls: ['./register-tray.component.scss']
})
export class RegisterTrayComponent implements OnInit {
  firstFormGroup: FormGroup;
  hotels: ArraySimpleInterface[] = [];
  cities: string[] = [];
  counties: any[] = [];
  messageNfcModel = new MessageNfcModel();
  roomAvailable: RoomAvailable;
  resultFromLogin: any;
  currentTrayTagId: string;

  private onSubject = new Subject<{ key: string, value: any }>();
  public changes = this.onSubject.asObservable().pipe(share());

  constructor(private deviceService: DeviceService,
    private winRef: WindowRef,
    private spinnerService: SpinnerService,
    public snackBar: MatSnackBar,
    public authService: AuthService) { }

  ngOnInit() {
    this.getAuthToken();
    this.getCountries();
    this.initializeForm();

    let localStorageData: any = localStorage.getItem('nfcData');
    this.currentTrayTagId = JSON.parse(localStorageData).tagId;

    if (localStorageData) {
      this.setNfcDataForDisplay(JSON.parse(localStorageData).existingData);
    }
  }

  initializeForm() {
    this.firstFormGroup = new FormGroup({
      firstCtrl: new FormControl('', [Validators.required]),
      countryCtrl: new FormControl('', [Validators.required]),
      cityCtrl: new FormControl('', [Validators.required]),
      hotelCtrl: new FormControl('', [Validators.required]),
      roomId: new FormControl('', [Validators.required, validateNumberPositive]),
      lightSensitivity: new FormControl('', [Validators.required, Validators.max(1023), Validators.min(0)]),
      wifiNameCtrl: new FormControl('', [Validators.required]),
      wifiPasswordCtrl: new FormControl('', [Validators.required])
    });
  }

  setNfcDataForDisplay(localStorageData: any) {
    let dataFromTagToParse: any = JSON.parse(localStorageData);
    let tempCountry = this.counties.find(country => country.Id == dataFromTagToParse.country);

    this.snackBar.openFromComponent(SnackbarNfcDataComponent, {
      data: dataFromTagToParse
    });
  }

  getAuthToken() {
    this.authService.login({}).subscribe(result => {
      this.resultFromLogin = result.token;
    });

  }

  getCountries(): void {
    this.deviceService.getCountries()
      .subscribe(data => this.counties = data);
  }

  setExistingData(existingData) {
    this.messageNfcModel.name = existingData.name;
    this.messageNfcModel.country = existingData.country;
    this.messageNfcModel.roomId = existingData.roomId;
    this.onCountryChange(this.messageNfcModel.country);
    this.messageNfcModel.city = existingData.city;
    this.onCityChange(this.messageNfcModel.city);
    this.messageNfcModel.hotelId = existingData.hotelId;
    this.messageNfcModel.wifiName = existingData.wifiName;
    this.messageNfcModel.wifiPassword = existingData.wifiPassword;
  }

  sendMessageToNfc() {
    if (this.messageNfcModel.lightSensitivity < 0 || this.messageNfcModel.lightSensitivity > 1023) {
      this.snackBar.open("Please enter a valid number for the light sensitivity", '', { duration: 2000 });
      return false;
    }
    this.roomAvailable = new RoomAvailable(
      this.messageNfcModel.roomId,
      this.messageNfcModel.name,
      this.messageNfcModel.hotelId,
      this.currentTrayTagId
    );
    this.spinnerService.show();
    this.deviceService.checkRoomAvailabilty(this.roomAvailable, this.resultFromLogin).subscribe(result => {
      this.spinnerService.hide();
      if (result && result.isCreated) {
        this.winRef.nativeWindow.foo(this.messageNfcModel);
      } else {
        this.snackBar.open("Error creating new room", '', { duration: 4000 });
        return false;
      }
    });
  }

  onCountryChange(countryId: number) {
    if (countryId != 0) {
      this.spinnerService.show();
      this.deviceService.getCities(countryId).subscribe(cities => {
        this.cities = cities;
        this.spinnerService.hide();
      });
    }
  }

  onCityChange(cityId: number) {
    if (cityId != 0) {
      this.spinnerService.show();
      this.deviceService.getHotels().subscribe(hotels => {
        this.hotels = hotels;
        this.spinnerService.hide();
      });
    }
  }

  resetForm() {
    this.messageNfcModel = new MessageNfcModel();
  }

  resetRoomNumner() {
    this.messageNfcModel.roomId = 0;
  }
}
