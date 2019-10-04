import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MessageNfcModel } from '../models/messageNfcModel';
import { ArraySimpleInterface } from '../interfaces';
import { DeviceService } from '../services/index';
import { SpinnerService } from '../services/spinner.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-predefined-data',
  templateUrl: './predefined-data.component.html',
  styleUrls: ['./predefined-data.component.css']
})
export class PredefinedDataComponent implements OnInit {
  firstFormGroup: FormGroup;
  messageNfcModel = new MessageNfcModel();
  hotels: ArraySimpleInterface[] = [];
  cities: string[] = [];
  counties: any[] = [];
  constructor(private _formBuilder: FormBuilder,
    private deviceService: DeviceService,
    private spinnerService: SpinnerService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.firstFormGroup = new FormGroup({
      firstCtrl: new FormControl(),
      countryCtrl: new FormControl(),
      cityCtrl: new FormControl(),
      hotelCtrl: new FormControl(),
      roomId: new FormControl(),
      lightSensitivity: new FormControl(),
      wifiNameCtrl: new FormControl(),
      wifiPasswordCtrl: new FormControl()
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [''],
      countryCtrl: [''],
      cityCtrl: [''],
      hotelCtrl: [''],
      roomId: [''],
      lightSensitivity: ['', [Validators.max(1023), Validators.min(0)]],
      wifiNameCtrl: [''],
      wifiPasswordCtrl: ['']
    });
    this.deviceService.getCountries().subscribe(counties => {
      this.counties = counties;
    });

    let localStorageData: any = localStorage.getItem('predifinedData');
    if (localStorageData) {
      localStorageData = JSON.parse(localStorageData);
      this.messageNfcModel.name = localStorageData.name;
      this.messageNfcModel.country = localStorageData.country;
      this.onCountryChange(this.messageNfcModel.country);
      this.messageNfcModel.city = localStorageData.city;
      this.onCityChange(this.messageNfcModel.city);
      this.messageNfcModel.hotelId = localStorageData.hotelId;
      this.messageNfcModel.wifiName = localStorageData.wifiName;
      this.messageNfcModel.wifiPassword = localStorageData.wifiPassword;
    }
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

  saveToDefaut() {
    localStorage.setItem('predifinedData', JSON.stringify(this.messageNfcModel));
    let temp = localStorage.getItem('predifinedData');
    if (temp != null || temp != undefined)
      this.snackBar.open("Default value has been saved", '', { duration: 2000 });
  }

  clearForm() {
    this.messageNfcModel = new MessageNfcModel();
  }

  deleteDefault() {
    localStorage.removeItem('predifinedData');
    let temp = localStorage.getItem('predifinedData');
    if (temp == null || temp == undefined) {
      this.snackBar.open("Default value has been removed", '', { duration: 2000 });
      this.messageNfcModel = new MessageNfcModel();
    }
  }
}
