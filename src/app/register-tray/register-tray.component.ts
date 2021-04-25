import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DeviceService, AuthService } from '../services/index';
import { ArraySimpleInterface } from '../interfaces/index';
import { MessageNfcModel, RoomAvailable } from '../models/index';
import { WindowRef } from '../WindowRef';
import { SpinnerService } from '../services/spinner.service';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { share } from 'rxjs/operators';
@Component({
  selector: 'app-register-tray',
  templateUrl: './register-tray.component.html',
  styleUrls: ['./register-tray.component.scss']
})
export class RegisterTrayComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  hotels: ArraySimpleInterface[] = [];
  cities: string[] = [];
  counties: any[] = [];
  messageNfcModel = new MessageNfcModel();
  roomAvailable: RoomAvailable;
  resultFromLogin: any;

  private onSubject = new Subject<{ key: string, value: any }>();
  public changes = this.onSubject.asObservable().pipe(share());

  constructor(private deviceService: DeviceService,
    private _formBuilder: FormBuilder,
    private winRef: WindowRef,
    private spinnerService: SpinnerService,
    public snackBar: MatSnackBar,
    public authService: AuthService) { }

  ngOnInit() {
    this.authService.login({}).subscribe(result => {
      this.resultFromLogin = result.token;
    });

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
      firstCtrl: ['', Validators.required],
      countryCtrl: ['', Validators.required],
      cityCtrl: ['', Validators.required],
      hotelCtrl: ['', Validators.required],
      roomId: ['', Validators.required],
      lightSensitivity: ['', [Validators.required, Validators.max(1023), Validators.min(0)]],
      wifiNameCtrl: ['', Validators.required],
      wifiPasswordCtrl: ['', Validators.required]
    });
    this.deviceService.getCountries().subscribe(counties => {
      this.counties = counties;
    });

    //let dataFromTray: any = localStorage.getItem('dataFromTray');
    let localStorageData: any = localStorage.getItem('predifinedData');
    if (localStorageData) {
      this.setExistingData(JSON.parse(localStorageData));
    }

    //If there is stored data but the usee came to an existing tray then the data that will be on the screen us from the tray
    // if (dataFromTray != undefined && localStorageData != undefined) {
    //   this.setExistingData(JSON.parse(dataFromTray));
    // }

    //set values from tray only
    // if (dataFromTray != undefined && localStorageData == undefined) {
    //   this.setExistingData(JSON.parse(dataFromTray));
    // }

    //tray from default values
    // if (dataFromTray == undefined && localStorageData != undefined) {
    //   this.setExistingData(JSON.parse(localStorageData));
    // }
    //this.start();
  }

  // private start(): void {
  //   window.addEventListener("storage", this.storageEventListener.bind(this));
  // }

  // private stop(): void {
  //   window.removeEventListener("storage", this.storageEventListener.bind(this));
  //   this.onSubject.complete();
  // }

  // private storageEventListener(event: StorageEvent) {
  //   if (event.storageArea == localStorage) {
  //     let v;
  //     try {
  //       v = JSON.parse(event.newValue);
  //     } catch (e) {
  //       v = event.newValue;
  //     }
  //     this.onSubject.next({ key: event.key, value: v });
  //     //alert(v);
  //     this.snackBar.open("got data", JSON.parse(v));
  //   }
  // }

  // public store(key: string, data: any): void {
  //   localStorage.setItem(key, JSON.stringify(data));
  //   // the local application doesn't seem to catch changes to localStorage...
  //   this.onSubject.next({ key: key, value: data })
  // }

  // public clear(key) {
  //   localStorage.removeItem(key);
  //   // the local application doesn't seem to catch changes to localStorage...
  //   this.onSubject.next({ key: key, value: null });
  // }

  // public getStorage() {
  //   let s = [];
  //   for (let i = 0; i < localStorage.length; i++) {
  //     s.push({
  //       key: localStorage.key(i),
  //       value: JSON.parse(localStorage.getItem(localStorage.key(i)))
  //     });
  //   }
  //   return s;
  // }

  // ngOnDestroy() {
  //   this.stop();
  // }

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
    this.roomAvailable = new RoomAvailable(this.messageNfcModel.roomId, this.messageNfcModel.name, this.messageNfcModel.hotelId);
    //this.messageNfcModel.email, this.messageNfcModel.hotelId);
    this.spinnerService.show();
    this.deviceService.checkRoomAvailabilty(this.roomAvailable, this.resultFromLogin).subscribe(result => {
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

  resetForm() {
    this.messageNfcModel = new MessageNfcModel();
  }

  resetRoomNumner() {
    this.messageNfcModel.roomId = 0;
  }
}
