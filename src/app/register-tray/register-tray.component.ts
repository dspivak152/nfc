import { Component, OnInit } from '@angular/core';
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
import { DeviceType, deviceTypesMapping } from '../enums/deviceType'
@Component({
  selector: 'app-register-tray',
  templateUrl: './register-tray.component.html',
  styleUrls: ['./register-tray.component.scss']
})
export class RegisterTrayComponent implements OnInit {
  firstFormGroup: FormGroup;
  hotels: ArraySimpleInterface[] = [];
  cities: any[] = [];
  counties: any[] = [];
  messageNfcModel = new MessageNfcModel();
  roomAvailable: RoomAvailable;
  resultFromLogin: any;
  currentTrayTagId: string;
  localCountry: string;
  localCity: string;
  localHotel: string;

  public deviceTypesMapping = deviceTypesMapping;
  public deviceTypes = Object.values(DeviceType);

  private onSubject = new Subject<{ key: string, value: any }>();
  public changes = this.onSubject.asObservable().pipe(share());

  constructor(private deviceService: DeviceService,
    private winRef: WindowRef,
    private spinnerService: SpinnerService,
    public snackBar: MatSnackBar,
    public authService: AuthService) { }

  ngOnInit() {
    this.getAuthToken();
    this.initializeForm();
    this.getCountries();
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
      wifiPasswordCtrl: new FormControl('', [Validators.required]),
      deviceId: new FormControl('')
    });
  }

  setNfcDataForDisplay() {
    let localStorageData: any = localStorage.getItem('nfcData');
    this.currentTrayTagId = JSON.parse(localStorageData).tagId;
    this.currentTrayTagId = this.currentTrayTagId.toUpperCase();
    let dataFromTagToParse: any = {};
    try {
      dataFromTagToParse = JSON.parse(JSON.parse(localStorageData).existingData);
    }
    catch (e) {
      dataFromTagToParse = {}
    }
    this.setExistingData(dataFromTagToParse);
  }

  getAuthToken() {
    this.authService.login({}).subscribe(result => {
      this.resultFromLogin = result.token;
    });

  }

  getCountries(): void {
    this.deviceService.getCountries()
      .subscribe(data => {
        this.counties = data;
        this.setNfcDataForDisplay();
      });
  }

  setExistingData(existingData) {
    this.messageNfcModel.name = existingData.name;
    this.messageNfcModel.country = existingData.country;
    this.messageNfcModel.roomId = existingData.roomId;
    if (this.messageNfcModel.country != undefined) {
      this.onCountryChange(this.messageNfcModel.country, existingData.city);
      this.onCityChange(this.messageNfcModel.city);
    }
    this.messageNfcModel.hotelId = existingData.hotelId;
    this.messageNfcModel.wifiName = existingData.wifiName;
    this.messageNfcModel.wifiPassword = existingData.wifiPassword;
    this.messageNfcModel.deviceId = this.currentTrayTagId;
    this.messageNfcModel.deviceType = existingData.deviceType;
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
      this.currentTrayTagId,
      this.messageNfcModel.deviceType
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

  onCountryChange(countryId: number, cityFromNfc: number): any {
    if (countryId != 0) {
      this.spinnerService.show();
      //this.localCountry = this.counties.find(country => country.id == countryId).name;
      this.deviceService.getCities(countryId).subscribe(cities => {
        this.cities = cities;
        this.messageNfcModel.city = cityFromNfc;
        this.spinnerService.hide();
        return this.cities;
      });
    }
  }

  onCityChange(cityId: number) {
    if (cityId != 0) {
      //this.localCity = this.cities.find(city => city.id == cityId).name;
      this.spinnerService.show();
      this.deviceService.getHotels().subscribe(hotels => {
        this.hotels = hotels;
        this.spinnerService.hide();
      });
    }
  }

  onHotelChange(hotelId: number) {
    if (hotelId != 0) {
      //@ts-ignore
      this.localHotel = this.hotels.find(hotel => hotel.id == hotelId).name;
    }
  }

  resetForm() {
    this.messageNfcModel = new MessageNfcModel();
    localStorage.removeItem('nfcData');
  }

  resetRoomNumner() {
    this.messageNfcModel.roomId = 0;
  }

  // setDataInNFC() {
  //   this.roomAvailable = new RoomAvailable(
  //     this.messageNfcModel.roomId,
  //     this.messageNfcModel.name,
  //     this.messageNfcModel.hotelId,
  //     this.currentTrayTagId,
  //     this.messageNfcModel.deviceType
  //   );

  //   this.winRef.nativeWindow.foo({ danny: "test" });
  // }
}
