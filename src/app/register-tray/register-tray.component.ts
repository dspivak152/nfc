import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DeviceService } from '../services/index';
import { ArraySimpleInterface } from '../interfaces/index';
import { MessageNfcModel } from '../models/index';
import { WindowRef } from '../WindowRef';

@Component({
  selector: 'app-register-tray',
  templateUrl: './register-tray.component.html',
  styleUrls: ['./register-tray.component.scss']
})
export class RegisterTrayComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thiredFormGroup: FormGroup;
  hotels: ArraySimpleInterface[] = [];
  cities: string[] = [];
  counties: any[] = [];
  messageNfcModel = new MessageNfcModel();

  constructor(private deviceService: DeviceService,
    private _formBuilder: FormBuilder,
    private winRef: WindowRef) { }

  ngOnInit() {
    this.firstFormGroup = new FormGroup({
      firstCtrl: new FormControl(),
      emailCtrl: new FormControl()
    });

    this.secondFormGroup = new FormGroup({
      countryCtrl: new FormControl(),
      cityCtrl: new FormControl(),
      hotelCtrl: new FormControl(),
      roomId: new FormControl()
    });

    this.thiredFormGroup = new FormGroup({
      wifiNameCtrl: new FormControl(),
      wifiPasswordCtrl: new FormControl()
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      countryCtrl: ['', Validators.required],
      cityCtrl: ['', Validators.required],
      hotelCtrl: ['', Validators.required],
      roomId: ['', Validators.required]
    });
    this.thiredFormGroup = this._formBuilder.group({
      wifiNameCtrl: ['', Validators.required],
      wifiPasswordCtrl: ['', Validators.required]
    });
    //let self = this;
    this.deviceService.getCountries().subscribe(counties => {
      this.counties = counties;
    });
    // this.deviceService.getHotels().subscribe(result => {
    //   if (result && result.length > 0) {
    //     result.forEach(function (hotel, index) {
    //       self.hotels.push({ Id: hotel.Id, Name: hotel.Name });
    //       if (hotel.City != null)
    //         self.cities.push(hotel.City);

    //       if (hotel.Country != null) {
    //         var found = (self.counties.indexOf(hotel.Country) > -1);
    //         if (!found)
    //           self.counties.push(hotel.Country);
    //       }
    //     });
    //   }
    // });
  }

  sendMessageToNfc() {
    this.winRef.nativeWindow.foo(this.messageNfcModel);
  }

  onCountryChange(countryId: number) {
    if (countryId > 0) {
      this.deviceService.getCities(countryId).subscribe(cities => {
        this.cities = cities;
      });
    }
  }

  onCityChange(cityId: number) {
    if (cityId > 0) {
      this.deviceService.getHotels().subscribe(hotels => {
        console.log(hotels);
        this.hotels = hotels;
      });
    }
  }
}
